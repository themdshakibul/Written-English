import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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

// Generate realistic dummy data
const generateMockData = (): ProductData[] => {
  const categories = ["Software", "Templates", "AI", "Design"];
  const items: ProductData[] = [];
  for (let i = 1; i <= 24; i++) {
    items.push({
      id: `prod-${i}`,
      title: `Premium ${categories[i % categories.length]} Asset ${i}`,
      shortDescription: `A high-quality, production-ready ${categories[i % categories.length]} solution that saves you hundreds of hours of development and design time.`,
      price: Math.floor(Math.random() * 500) + 49,
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      location: ["Global", "US/EU", "Asia", "Remote"][i % 4],
      date: `Listed ${i}d ago`,
      category: categories[i % categories.length],
      imageUrl: `https://images.unsplash.com/photo-${1551288049 + i}-bebda4e38f71?auto=format&fit=crop&q=80&w=800`
    });
  }
  return items;
};

const allProducts = generateMockData();
const ITEMS_PER_PAGE = 8;

// Type for search params in App Router
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ExplorePage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q.toLowerCase() : "";
  const category = typeof resolvedParams.category === "string" ? resolvedParams.category : "all";
  const sort = typeof resolvedParams.sort === "string" ? resolvedParams.sort : "newest";
  const page = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page, 10) : 1;

  // 1. Filter
  let filtered = allProducts.filter(p => {
    const matchQuery = q ? p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) : true;
    const matchCategory = category !== "all" ? p.category === category : true;
    return matchQuery && matchCategory;
  });

  // 2. Sort
  filtered = filtered.sort((a, b) => {
    switch (sort) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "newest": 
      default:
        // Mock newest sort using ID string comparisons
        return b.id.localeCompare(a.id);
    }
  });

  // 3. Paginate
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, page), totalPages || 1);
  const paginatedItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Helper for generating page links
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Pagination */}
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
