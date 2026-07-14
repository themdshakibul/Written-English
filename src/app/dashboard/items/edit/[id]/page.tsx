"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getItemById, updateItem } from "@/app/actions/itemActions";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function EditItemPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [defaults, setDefaults] = useState<Record<string, string>>({});

  useEffect(() => {
    getItemById(id).then((item) => {
      if (!item) {
        setNotFound(true);
      } else {
        setDefaults(item);
      }
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await updateItem(id, formData);
    router.push("/dashboard/items/manage");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted-foreground">Item not found.</p>
        <Button variant="outline" onClick={() => router.push("/dashboard/items/manage")}>
          Back to My Items
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="border-b border-border bg-background">
        <Container className="py-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-sm">
              <Pencil className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Edit Asset</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Update your marketplace listing.</p>
            </div>
          </div>
        </Container>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Card className="border-border/60 shadow-md">
          <CardHeader>
            <CardTitle>Asset Details</CardTitle>
            <CardDescription>Modify the fields below to update your asset.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input name="title" required defaultValue={defaults.title} placeholder="e.g., Premium Analytics Dashboard" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (USD)</label>
                  <Input type="number" name="price" required defaultValue={defaults.price} placeholder="99" min="0" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select name="category" required defaultValue={defaults.category || "Software"}>
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
                <Input name="shortDescription" required maxLength={150} defaultValue={defaults.shortDescription} placeholder="A brief summary of your asset..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Full Description</label>
                <Textarea 
                  name="fullDescription" 
                  required 
                  className="min-h-[150px]" 
                  defaultValue={defaults.fullDescription}
                  placeholder="Detail the technical specifications, features, and what is included..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input name="imageUrl" required type="url" defaultValue={defaults.imageUrl} placeholder="https://images.unsplash.com/photo-..." />
                <p className="text-xs text-muted-foreground">Provide a direct link to the cover image of your asset.</p>
              </div>

              <div className="pt-4 flex justify-end gap-4 border-t border-border/50">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting} className="shadow-sm">
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
