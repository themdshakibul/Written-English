"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { addItem } from "@/app/actions/itemActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddItemPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    // Automatically set the date
    formData.append("date", new Date().toISOString().split("T")[0]);
    
    await addItem(formData);
    router.push("/items/manage");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Add New Digital Asset</h1>
          <p className="text-muted-foreground mt-2">List your premium asset on the marketplace.</p>
        </div>

        <Card className="border-border/60 shadow-md">
          <CardHeader>
            <CardTitle>Asset Details</CardTitle>
            <CardDescription>Provide the necessary information to list your asset.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input name="title" required placeholder="e.g., Premium Analytics Dashboard" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (USD)</label>
                  <Input type="number" name="price" required placeholder="99" min="0" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select name="category" required defaultValue="Software">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Templates">Templates</SelectItem>
                      <SelectItem value="AI">AI Models</SelectItem>
                      <SelectItem value="Design">Design Kits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Short Description (Max 150 chars)</label>
                <Input name="shortDescription" required maxLength={150} placeholder="A brief summary of your asset..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Full Description</label>
                <Textarea 
                  name="fullDescription" 
                  required 
                  className="min-h-[150px]" 
                  placeholder="Detail the technical specifications, features, and what is included..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input name="imageUrl" required type="url" placeholder="https://images.unsplash.com/photo-..." />
                <p className="text-xs text-muted-foreground">Provide a direct link to the cover image of your asset.</p>
              </div>

              <div className="pt-4 flex justify-end gap-4 border-t border-border/50">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Publishing..." : "Publish Asset"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
