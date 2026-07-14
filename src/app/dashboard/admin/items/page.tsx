"use client";

import { useEffect, useState } from "react";
import { getAllItems, deleteItem } from "@/app/actions/itemActions";
import { Shield, Trash2, ExternalLink, Package, Pencil, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Container } from "@/components/ui/container";

export default function AdminItemsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = () => {
    getAllItems().then((data) => {
      setItems(data);
      setLoading(false);
    });
  };

  useEffect(() => { fetchItems() }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Delete this item? This cannot be undone.")) {
      await deleteItem(id);
      fetchItems();
    }
  };

  return (
    <>
      <div className="border-b border-border bg-background">
        <Container className="py-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-sm">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">All Items</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Every item on the marketplace. Admins can add, edit, or delete any listing.</p>
            </div>
            <Button asChild className="shadow-sm ml-auto">
              <Link href="/dashboard/items/add">
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Link>
            </Button>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        <div className="border border-border/60 rounded-xl overflow-hidden bg-card shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center h-32 text-muted-foreground">Loading...</TableCell></TableRow>
              ) : items.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center h-32 text-muted-foreground">No items listed yet.</TableCell></TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted">
                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{item.title}</TableCell>
                    <TableCell><Badge variant="secondary">{item.category}</Badge></TableCell>
                    <TableCell className="font-semibold text-primary">${item.price}</TableCell>
                    <TableCell className="text-xs text-muted-foreground truncate max-w-[120px]">{item.userId}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild className="shadow-sm">
                          <Link href={`/items/${item._id}`}><ExternalLink className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="shadow-sm">
                          <Link href={`/dashboard/items/edit/${item._id}`}><Pencil className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(item._id)} className="shadow-sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Container>
    </>
  );
}
