import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ProductCard, ProductData } from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ShieldCheck, Download, Clock, Globe } from "lucide-react";
import Image from "next/image";

// Extended mock data for the specific item
const itemDetails = {
  id: "prod-1",
  title: "Premium SaaS Analytics Dashboard",
  shortDescription: "Complete analytics solution with real-time tracking, custom reports, and user segmentation.",
  fullDescription: "Built with Next.js 14 and Tailwind CSS, this SaaS analytics dashboard is everything you need to kickstart your next project. It includes over 40+ pre-built components, dynamic charting using Recharts, and a fully responsive layout. Whether you're building an internal tool or a customer-facing product, this dashboard will save you hundreds of hours of development time. It features a dark/light mode toggle, completely modular components, and is fully typed with TypeScript.",
  price: 499,
  rating: 4.8,
  reviewsCount: 124,
  location: "Global",
  date: "Listed 2d ago",
  category: "Software",
  images: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", // Duplicated for grid demonstration
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  ],
  specs: [
    { label: "Framework", value: "Next.js 14 (App Router)" },
    { label: "Language", value: "TypeScript" },
    { label: "Styling", value: "Tailwind CSS v4" },
    { label: "Components", value: "Shadcn UI" },
    { label: "Charts", value: "Recharts" },
    { label: "License", value: "Extended Commercial" },
  ],
  reviews: [
    { id: 1, user: "Alex Morgan", avatar: "AM", rating: 5, date: "2 weeks ago", text: "Incredible attention to detail. The code is extremely clean and easy to modify. Saved our team at least 3 weeks of work." },
    { id: 2, user: "Sarah Jenkins", avatar: "SJ", rating: 4, date: "1 month ago", text: "Great dashboard! The charts look beautiful. Only giving 4 stars because I had to tweak the mobile navigation slightly for our specific use case." },
    { id: 3, user: "David Chen", avatar: "DC", rating: 5, date: "2 months ago", text: "Best template I've purchased this year. Worth every penny." },
  ]
};

// Generate related items for the bottom grid
const relatedItems: ProductData[] = Array.from({ length: 4 }).map((_, i) => ({
  id: `rel-${i}`,
  title: `Related Analytics Asset ${i + 1}`,
  shortDescription: "A great companion asset for your dashboard.",
  price: 99 + (i * 50),
  rating: 4.5 + (i * 0.1),
  location: "Global",
  date: "Listed 1w ago",
  category: "Software",
  imageUrl: `https://images.unsplash.com/photo-${1551288049 + i}-bebda4e38f71?auto=format&fit=crop&q=80&w=800`
}));

// In Next.js 15, params is a Promise
type Props = {
  params: Promise<{ id: string }>;
};

export default async function ItemDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams; // Normally you'd fetch data based on this ID
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Section: Media & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
            
            {/* Media Gallery */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted">
                <Image 
                  src={itemDetails.images[0]} 
                  alt={itemDetails.title} 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {itemDetails.images.slice(1).map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted hover:opacity-80 transition-opacity cursor-pointer">
                    <Image src={img} alt={`Gallery image ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & High-level Info */}
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{itemDetails.category}</Badge>
                  <div className="flex items-center text-sm font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    <Star className="h-3 w-3 mr-1 fill-current" /> {itemDetails.rating} ({itemDetails.reviewsCount})
                  </div>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">{itemDetails.title}</h1>
                <p className="text-muted-foreground text-lg">{itemDetails.shortDescription}</p>
              </div>

              <Card className="border-border/60 shadow-sm bg-card">
                <CardContent className="p-6">
                  <div className="text-4xl font-black text-primary mb-6">
                    ${itemDetails.price.toLocaleString()}
                  </div>
                  
                  <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-emerald-500" />
                      <span>Verified Creator</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5" />
                      <span>{itemDetails.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5" />
                      <span>{itemDetails.date}</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full text-base h-12 mb-3 shadow-md shadow-primary/20">
                    <Download className="mr-2 h-5 w-5" /> Purchase & Download
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Includes 6 months of technical support and lifetime updates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="mb-12" />

          {/* Structured Sections: Description, Specs, Reviews */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start border-b border-border rounded-none h-auto p-0 bg-transparent mb-8">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 text-base">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 text-base">
                    Reviews ({itemDetails.reviewsCount})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-8 animate-in fade-in-50 duration-500">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Detailed Description</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                      <p>{itemDetails.fullDescription}</p>
                      <p className="mt-4">
                        This asset is continuously updated to meet the latest industry standards. 
                        It has been thoroughly tested across all major browsers and devices to ensure a seamless experience.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6 animate-in fade-in-50 duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">User Reviews</h3>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                  
                  <div className="space-y-6">
                    {itemDetails.reviews.map((review) => (
                      <div key={review.id} className="border border-border/50 rounded-xl p-6 bg-muted/20">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary/10 text-primary">{review.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-sm">{review.user}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex gap-0.5 text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-muted/30 fill-current'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar Specs */}
            <div>
              <Card className="border-border/60 bg-muted/10 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-6">Technical Specifications</h3>
                  <div className="space-y-4">
                    {itemDetails.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between items-center pb-4 border-b border-border/50 last:border-0 last:pb-0">
                        <span className="text-muted-foreground text-sm">{spec.label}</span>
                        <span className="font-medium text-sm text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Items */}
          <div className="pt-16 border-t border-border/50">
            <h2 className="text-2xl font-bold tracking-tight mb-8">You might also like</h2>
            <ProductGrid isLoading={false}>
              {relatedItems.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </ProductGrid>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
