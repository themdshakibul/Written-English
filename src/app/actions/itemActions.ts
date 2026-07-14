"use server";

import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function getUserId(): Promise<string | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user?.id || null;
}

export async function addItem(formData: FormData) {
  const userId = await getUserId();
  if (!userId) return { success: false, error: "Not authenticated" };

  const db = await connectToDatabase();
  
  const newItem = {
    title: formData.get("title") as string,
    shortDescription: formData.get("shortDescription") as string,
    fullDescription: formData.get("fullDescription") as string,
    price: Number(formData.get("price")),
    date: formData.get("date") as string,
    category: formData.get("category") as string,
    imageUrl: formData.get("imageUrl") as string,
    userId,
  };

  if (db) {
    const item = new Item(newItem);
    await item.save();
  }

  revalidatePath("/items/manage");
  revalidatePath("/explore");
  return { success: true };
}

export async function getUserItems() {
  const userId = await getUserId();
  if (!userId) return [];

  const db = await connectToDatabase();
  
  if (db) {
    const items = await Item.find({ userId }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(items));
  }
  
  return [];
}

export async function deleteItem(id: string) {
  const db = await connectToDatabase();
  
  if (db) {
    await Item.findByIdAndDelete(id);
  }

  revalidatePath("/items/manage");
  return { success: true };
}
