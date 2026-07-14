"use client";

import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ArrowUpRight, Heart } from "lucide-react";

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
    <Link href={`/items/${product.id}`} className="block group">
      <article className="relative flex flex-col h-full overflow-hidden rounded-3xl bg-card border border-black/[0.04] dark:border-white/[0.06] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1),0_0_0_0_rgba(0,0,0,0)] hover:border-black/[0.08] dark:hover:border-white/[0.1] hover:-translate-y-1">

        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Subtle bottom scrim */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category pill — top left */}
          <div className="absolute top-3.5 left-3.5">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-white/90 dark:bg-black/60 backdrop-blur-md text-foreground/80 border border-black/[0.06] dark:border-white/[0.08]">
              {product.category}
            </span>
          </div>

          {/* Rating pill — top right */}
          <div className="absolute top-3.5 right-3.5">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold bg-black/35 backdrop-blur-md text-white border border-white/[0.08]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Wishlist — shows on hover */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute bottom-3.5 right-3.5 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md text-foreground/50 hover:text-red-500 border border-black/[0.06] dark:border-white/[0.08] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 z-10"
            aria-label="Add to wishlist"
          >
            <Heart className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-[15px] leading-snug line-clamp-1 text-foreground" title={product.title}>
              {product.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-foreground/20 group-hover:text-foreground/60 flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Tags row */}
          <div className="mt-auto pt-1 flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">
              ★ {product.rating.toFixed(1)}
            </span>
            <span className="text-muted-foreground/30">·</span>
            <span className="text-[11px] text-muted-foreground">{product.location}</span>
            <span className="text-muted-foreground/30">·</span>
            <span className="text-[11px] text-muted-foreground">{product.date}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex items-center justify-between">
          <div className="flex items-baseline gap-0.5">
            <span className="text-lg font-bold tracking-tight text-foreground">
              ${product.price.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground font-medium">USD</span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
            View
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-card border border-black/[0.04] dark:border-white/[0.06]">
      <Skeleton className="w-full aspect-[4/3] rounded-none" />
      <div className="p-5 flex flex-col gap-3">
        <Skeleton className="h-5 w-2/3" />
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>
        <div className="mt-auto pt-1 flex gap-2">
          <Skeleton className="h-4 w-10 rounded-md" />
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
      <div className="px-5 pb-5 flex items-center justify-between">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  );
}
