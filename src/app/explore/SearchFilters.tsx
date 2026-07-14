"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentQuery = searchParams.get("q") || "";
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "newest";

  const [query, setQuery] = useState(currentQuery);
  const debouncedQuery = useDebounce(query, 500);

  const updateFilters = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    // Reset to page 1 on filter change
    params.delete("page");
    router.push(`/explore?${params.toString()}`);
  }, [searchParams, router]);

  // Handle debounced search
  useEffect(() => {
    if (debouncedQuery !== currentQuery) {
      updateFilters("q", debouncedQuery);
    }
  }, [debouncedQuery, currentQuery, updateFilters]);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full bg-muted/20 p-4 rounded-xl border border-border/50">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search for digital assets..." 
          className="pl-9 bg-background"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      
      <div className="flex gap-4 md:w-auto w-full">
        <Select value={currentCategory} onValueChange={(val) => updateFilters("category", val)}>
          <SelectTrigger className="w-[160px] bg-background">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Software">Software</SelectItem>
            <SelectItem value="Templates">Templates</SelectItem>
            <SelectItem value="AI">AI Models</SelectItem>
            <SelectItem value="Design">Design Kits</SelectItem>
          </SelectContent>
        </Select>

        <Select value={currentSort} onValueChange={(val) => updateFilters("sort", val)}>
          <SelectTrigger className="w-[160px] bg-background">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
