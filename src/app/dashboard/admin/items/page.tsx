"use client";

import { Shield, Trash2, ExternalLink, Pencil, Plus } from "lucide-react";
import { getAllItems, deleteItem } from "@/app/actions/itemActions";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Container } from "@/components/ui/container";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

export default function AdminItemsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    const data = await getAllItems();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    await deleteItem(deleteTargetId);
    setDeleteDialogOpen(false);
    setDeleteTargetId(null);
    fetchItems();
  };

  return (
    <>
      <div className="border-b border-border bg-background">
        <Container className="py-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-sm">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">All Items</h1>
                <p className="text-muted-foreground text-sm mt-0.5">Manage all listed digital assets across the platform.</p>
              </div>
            </div>
            <Button asChild className="shadow-sm">
              <Link href="/dashboard/items/add">
                <Plus className="mr-2 h-4 w-4" /> Add New Asset
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
                <TableHead>Status</TableHead>
                <TableHead>Date Listed</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
                    Loading assets...
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
                    No assets found.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted">
                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {item.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-primary">
                      ${item.price}
                    </TableCell>
                    <TableCell>
                      {item.status === "pending" ? (
                        <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20">Pending</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Approved</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {item.date}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button variant="outline" size="sm" asChild className="shadow-sm">
                          <Link href={`/items/${item._id}`}>
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="shadow-sm">
                          <Link href={`/dashboard/items/edit/${item._id}`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setDeleteTargetId(item._id);
                            setDeleteDialogOpen(true);
                          }}
                          className="shadow-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
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

      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Asset"
        description="Are you sure you want to delete this asset? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
      />
    </>
  );
}
