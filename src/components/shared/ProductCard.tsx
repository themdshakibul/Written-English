import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export interface ProductData {
  id: string;
  title: string;
  shortDescription: string;
  price: number;
  rating: number;
  location: string;
  date: string;
  imageUrl: string;
  category: string;
}

interface ProductCardProps {
  product: ProductData;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border/50 bg-card">
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <Badge className="absolute top-3 right-3 shadow-sm bg-background/80 backdrop-blur-md text-foreground hover:bg-background/90">
          {product.category}
        </Badge>
      </div>
      
      <CardContent className="flex-grow p-5 flex flex-col gap-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-lg line-clamp-1 text-foreground" title={product.title}>
            {product.title}
          </h3>
          <div className="flex items-center text-sm font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full shrink-0">
            ★ {product.rating.toFixed(1)}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {product.shortDescription}
        </p>
        
        <div className="mt-auto pt-4 flex flex-col gap-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span className="truncate">{product.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            <span>{product.date}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-border/50 bg-muted/20">
        <div className="font-bold text-lg text-primary">
          ${product.price.toLocaleString()}
        </div>
        <Button asChild variant="default" size="sm" className="rounded-full shadow-md font-medium transition-all hover:scale-105 active:scale-95">
          <Link href={`/items/${product.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col h-full overflow-hidden border border-border/50 bg-card">
      <Skeleton className="w-full aspect-[4/3] rounded-none" />
      <CardContent className="flex-grow p-5 flex flex-col gap-3">
        <div className="flex justify-between items-start gap-2">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <div className="space-y-2 mt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="mt-auto pt-4 space-y-2">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-border/50 bg-muted/20">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-9 w-28 rounded-full" />
      </CardFooter>
    </Card>
  );
}
