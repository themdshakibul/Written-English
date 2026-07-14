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
    <Card className="group flex flex-col h-full overflow-hidden border border-border/40 bg-card transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:border-primary/20 hover:-translate-y-1.5">
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Badge className="absolute top-3 left-3 shadow-sm bg-white/90 backdrop-blur-md text-foreground border-0 text-xs font-medium">
          {product.category}
        </Badge>
        <div className="absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold text-amber-500 bg-amber-500/10 backdrop-blur-md px-2 py-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          {product.rating.toFixed(1)}
        </div>
      </div>
      
      <CardContent className="flex-grow p-5 flex flex-col gap-2.5">
        <h3 className="font-semibold text-[15px] leading-snug line-clamp-1 text-foreground group-hover:text-primary transition-colors duration-300" title={product.title}>
          {product.title}
        </h3>
        
        <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-2">
          {product.shortDescription}
        </p>
        
        <div className="mt-auto pt-3 flex items-center gap-4 text-xs text-muted-foreground/60">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{product.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            <span>{product.date}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-border/30">
        <div className="flex items-baseline gap-0.5">
          <span className="text-xs text-muted-foreground/60 font-medium">$</span>
          <span className="text-xl font-bold text-foreground tracking-tight">{product.price.toLocaleString()}</span>
        </div>
        <Button asChild variant="default" size="sm" className="rounded-lg shadow-sm font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.03] active:scale-95">
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
    <Card className="flex flex-col h-full overflow-hidden border border-border/40 bg-card">
      <Skeleton className="w-full aspect-[4/3] rounded-none" />
      <CardContent className="flex-grow p-5 flex flex-col gap-3">
        <div className="flex justify-between items-start gap-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>
        <div className="space-y-2 mt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="mt-auto pt-3 space-y-2">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-border/30">
        <Skeleton className="h-7 w-16" />
        <Skeleton className="h-9 w-28 rounded-lg" />
      </CardFooter>
    </Card>
  );
}
