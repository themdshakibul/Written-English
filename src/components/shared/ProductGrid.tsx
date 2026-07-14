import { ReactNode } from "react";
import { ProductCardSkeleton } from "./ProductCard";

interface ProductGridProps {
  children?: ReactNode;
  isLoading?: boolean;
  skeletonCount?: number;
}

export function ProductGrid({ 
  children, 
  isLoading = false, 
  skeletonCount = 8 
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto py-8">
      {isLoading 
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <ProductCardSkeleton key={`skeleton-${i}`} />
          ))
        : children
      }
    </div>
  );
}
