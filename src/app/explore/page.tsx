import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ProductCard, ProductData } from "@/components/shared/ProductCard";
import { SearchFilters } from "./SearchFilters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 8;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ExplorePage({ searchParams }: Props) {
  const resolvedParams = await searchParams;

  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  const category = typeof resolvedParams.category === "string" ? resolvedParams.category : "all";
  const sort = typeof resolvedParams.sort === "string" ? resolvedParams.sort : "newest";
  const page = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page, 10) : 1;

  const db = await connectToDatabase();

  let allItems: ProductData[] = [];

  if (db) {
    const filter: Record<string, unknown> = { status: { $ne: "pending" } };
    if (category !== "all") filter.category = category;
    if (q) filter.title = { $regex: q, $options: "i" };

    const sortOption: Record<string, 1 | -1> =
      sort === "price-asc" ? { price: 1 } :
      sort === "price-desc" ? { price: -1 } :
      sort === "rating" ? { rating: -1 } :
      { createdAt: -1 };

    const rawItems = await Item.find(filter).sort(sortOption).lean();

    allItems = rawItems.map((item: Record<string, unknown>) => ({
      id: String(item._id),
      title: item.title as string,
      shortDescription: item.shortDescription as string,
      price: item.price as number,
      rating: (item.rating as number) || 0,
      location: "Global",
      date: item.date as string,
      imageUrl: item.imageUrl as string,
      category: item.category as string,
    }));
  }

  const totalItems = allItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, page), totalPages || 1);
  const paginatedItems = allItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category !== "all") params.set("category", category);
    if (sort !== "newest") params.set("sort", sort);
    if (pageNumber > 1) params.set("page", pageNumber.toString());
    return `/explore?${params.toString()}`;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-background">
        <Container>
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Explore Marketplace</h1>
            <p className="text-lg text-muted-foreground">Discover premium digital assets, filtered and sorted to your needs.</p>
          </div>

          <SearchFilters />

          <div className="mt-6 mb-4 flex justify-between items-center text-sm text-muted-foreground">
            <span>Showing {paginatedItems.length} of {totalItems} items</span>
          </div>

          {paginatedItems.length > 0 ? (
            <ProductGrid isLoading={false}>
              {paginatedItems.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </ProductGrid>
          ) : (
            <div className="py-24 text-center">
              <h3 className="text-xl font-semibold mb-2">No assets found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href={createPageUrl(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
