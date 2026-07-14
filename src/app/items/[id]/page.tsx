import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ProductCard, ProductData } from "@/components/shared/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, ShieldCheck, Clock, Globe } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BuyButton } from "./BuyButton";
import { Container } from "@/components/ui/container";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ItemDetailsPage({ params }: Props) {
  const { id } = await params;

  const db = await connectToDatabase();

  if (!db) return notFound();

  const item = await Item.findById(id).lean() as Record<string, unknown> | null;
  if (!item) return notFound();

  const relatedItems = await Item.find({
    _id: { $ne: item._id },
    category: item.category,
  }).limit(4).lean();

  const relatedProducts: ProductData[] = relatedItems.map((r: Record<string, unknown>) => ({
    id: String(r._id),
    title: r.title as string,
    shortDescription: r.shortDescription as string,
    price: r.price as number,
    rating: (r.rating as number) || 0,
    location: "Global",
    date: r.date as string,
    imageUrl: r.imageUrl as string,
    category: r.category as string,
  }));

  const imageUrl = item.imageUrl as string;
  const title = item.title as string;
  const shortDescription = item.shortDescription as string;
  const fullDescription = item.fullDescription as string;
  const price = item.price as number;
  const rating = (item.rating as number) || 0;
  const date = item.date as string;
  const category = item.category as string;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12">
        <Container>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">

            <div className="lg:col-span-2 space-y-4">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{category}</Badge>
                  <div className="flex items-center text-sm font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    <Star className="h-3 w-3 mr-1 fill-current" /> {rating}
                  </div>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">{title}</h1>
                <p className="text-muted-foreground text-lg">{shortDescription}</p>
              </div>

              <Card className="border-border/60 shadow-sm bg-card">
                <CardContent className="p-6">
                  <div className="text-4xl font-black text-primary mb-6">
                    ${price.toLocaleString()}
                  </div>

                  <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-emerald-500" />
                      <span>Verified Creator</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5" />
                      <span>Global</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5" />
                      <span>{date}</span>
                    </div>
                  </div>

                  <BuyButton itemId={id} />
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="mb-12" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4">Description</h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>{fullDescription}</p>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="pt-16 border-t border-border/50">
              <h2 className="text-2xl font-bold tracking-tight mb-8">You might also like</h2>
              <ProductGrid isLoading={false}>
                {relatedProducts.map(r => (
                  <ProductCard key={r.id} product={r} />
                ))}
              </ProductGrid>
            </div>
          )}

        </Container>
      </main>

      <Footer />
    </div>
  );
}
