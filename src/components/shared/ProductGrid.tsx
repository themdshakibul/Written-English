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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full py-6">
      {isLoading 
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <ProductCardSkeleton key={`skeleton-${i}`} />
          ))
        : children
      }
    </div>
  );
}
