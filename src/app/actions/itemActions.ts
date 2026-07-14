"use server";

import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import { revalidatePath } from "next/cache";

// Global mock storage as fallback if MongoDB is not connected
let mockItems: any[] = [
  {
    _id: "1",
    title: "Demo SaaS App",
    shortDescription: "A great demo app",
    fullDescription: "A full description of the demo app...",
    price: 99,
    date: "2026-07-14",
    category: "Software",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    rating: 4.5
  }
];

export async function addItem(formData: FormData) {
  const db = await connectToDatabase();
  
  const newItem = {
    title: formData.get("title") as string,
    shortDescription: formData.get("shortDescription") as string,
    fullDescription: formData.get("fullDescription") as string,
    price: Number(formData.get("price")),
    date: formData.get("date") as string,
    category: formData.get("category") as string,
    imageUrl: formData.get("imageUrl") as string,
  };

  if (db) {
    const item = new Item(newItem);
    await item.save();
  } else {
    // Fallback to mock data for demonstration purposes
    mockItems.push({
      _id: Math.random().toString(36).substr(2, 9),
      ...newItem,
      rating: 0
    });
  }

  revalidatePath("/items/manage");
  revalidatePath("/explore");
  return { success: true };
}

export async function getUserItems() {
  const db = await connectToDatabase();
  
  if (db) {
    const items = await Item.find({ userId: "demo-user-123" }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(items));
  }
  
  // Fallback
  return mockItems;
}

export async function deleteItem(id: string) {
  const db = await connectToDatabase();
  
  if (db) {
    await Item.findByIdAndDelete(id);
  } else {
    mockItems = mockItems.filter(item => item._id !== id);
  }

  revalidatePath("/items/manage");
  return { success: true };
}
