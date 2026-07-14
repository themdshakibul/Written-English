"use server";

import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import Payment from "@/models/Payment";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function getSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  return {
    userId: session.user.id,
    role: (session.user as Record<string, unknown>).role as string || "user",
  };
}

async function isAdmin(): Promise<boolean> {
  const s = await getSession();
  return s?.role === "admin";
}

export async function addItem(formData: FormData) {
  const session = await getSession();
  if (!session) return { success: false, error: "Not authenticated" };

  const db = await connectToDatabase();
  
  const admin = await isAdmin();
  const status = admin ? "approved" : "pending";

  const newItem = {
    title: formData.get("title") as string,
    shortDescription: formData.get("shortDescription") as string,
    fullDescription: formData.get("fullDescription") as string,
    price: Number(formData.get("price")),
    date: formData.get("date") as string,
    category: formData.get("category") as string,
    imageUrl: formData.get("imageUrl") as string,
    userId: session.userId,
    status,
  };

  if (db) {
    const item = new Item(newItem);
    await item.save();
  }

  revalidatePath("/items/manage");
  revalidatePath("/explore");
  return { success: true };
}

export async function getAllPurchases() {
  const session = await getSession();
  const _admin = await isAdmin();
  if (!session || !_admin) return [];

  const db = await connectToDatabase();
  if (!db) return [];

  const payments = await Payment.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(payments));
}

export async function getUserItems() {
  const session = await getSession();
  if (!session) return [];

  const db = await connectToDatabase();
  if (!db) return [];

  const items = await Item.find({ userId: session.userId }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
}

export async function getAllItems() {
  const db = await connectToDatabase();
  if (!db) return [];

  const items = await Item.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
}

export async function getUserPurchases(userIdOverride?: string) {
  const session = await getSession();
  if (!session) return [];

  const db = await connectToDatabase();
  if (!db) return [];

  const id = userIdOverride || session.userId;
  const payments = await Payment.find({ userId: id, status: "completed" })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(payments));
}

export async function getRevenueData() {
  const db = await connectToDatabase();
  if (!db) return { monthly: [], total: 0 };

  const payments = await Payment.find().sort({ createdAt: 1 }).lean();
  const total = payments.reduce((s, p) => s + (p.amount || 0), 0);

  const monthMap: Record<string, number> = {};
  payments.forEach((p) => {
    const d = p.createdAt ? new Date(p.createdAt) : null;
    if (d && !isNaN(d.getTime())) {
      const key = d.toLocaleString("en-US", { month: "short" });
      monthMap[key] = (monthMap[key] || 0) + (p.amount || 0);
    }
  });

  const allMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthly = allMonths.map((name) => ({
    name,
    revenue: monthMap[name] || 0,
  }));

  return { monthly, total };
}

export async function getItemById(id: string) {
  const db = await connectToDatabase();
  if (!db) return null;

  const item = await Item.findById(id).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function updateItem(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) return { success: false, error: "Not authenticated" };

  const db = await connectToDatabase();
  if (!db) return { success: false, error: "Database unavailable" };

  const existing = await Item.findById(id);
  if (!existing) return { success: false, error: "Item not found" };
  const admin = await isAdmin();
  if (!admin && existing.userId !== session.userId) {
    return { success: false, error: "Not authorized" };
  }

  existing.title = formData.get("title") as string;
  existing.shortDescription = formData.get("shortDescription") as string;
  existing.fullDescription = formData.get("fullDescription") as string;
  existing.price = Number(formData.get("price"));
  existing.category = formData.get("category") as string;
  existing.imageUrl = formData.get("imageUrl") as string;

  await existing.save();

  revalidatePath("/items/manage");
  revalidatePath("/explore");
  revalidatePath(`/items/${id}`);
  return { success: true };
}

export async function deleteItem(id: string) {
  const session = await getSession();
  if (!session) return { success: false, error: "Not authenticated" };

  const db = await connectToDatabase();
  if (!db) return { success: false, error: "Database unavailable" };

  const existing = await Item.findById(id);
  if (!existing) return { success: false, error: "Item not found" };
  const admin = await isAdmin();
  if (!admin && existing.userId !== session.userId) {
    return { success: false, error: "Not authorized" };
  }

  await Item.findByIdAndDelete(id);
  revalidatePath("/items/manage");
  return { success: true };
}

export async function getPendingItems() {
  const session = await getSession();
  const _admin = await isAdmin();
  if (!session || !_admin) return [];

  const db = await connectToDatabase();
  if (!db) return [];

  const items = await Item.find({ status: "pending" }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
}

export async function approveItem(id: string) {
  const session = await getSession();
  const _admin = await isAdmin();
  if (!session || !_admin) return { success: false, error: "Not authorized" };

  const db = await connectToDatabase();
  if (!db) return { success: false, error: "Database unavailable" };

  await Item.findByIdAndUpdate(id, { status: "approved" });
  revalidatePath("/explore");
  revalidatePath("/dashboard/admin/approvals");
  return { success: true };
}

export async function rejectItem(id: string) {
  const session = await getSession();
  const _admin = await isAdmin();
  if (!session || !_admin) return { success: false, error: "Not authorized" };

  const db = await connectToDatabase();
  if (!db) return { success: false, error: "Database unavailable" };

  await Item.findByIdAndDelete(id);
  revalidatePath("/dashboard/admin/approvals");
  return { success: true };
}

export async function getAllUsers() {
  const session = await getSession();
  const _admin = await isAdmin();
  if (!session || !_admin) return [];

  const { MongoClient } = require("mongodb");
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  const db = client.db();
  const users = await db.collection("user").find({}).toArray();
  await client.close();
  return JSON.parse(JSON.stringify(users));
}

export async function updateUserRole(userId: string, newRole: string) {
  const session = await getSession();
  const _admin = await isAdmin();
  if (!session || !_admin) return { success: false, error: "Not authorized" };

  const { MongoClient } = require("mongodb");
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  const db = client.db();
  await db.collection("user").updateOne(
    { _id: new (require("mongodb")).ObjectId(userId) },
    { $set: { role: newRole } }
  );
  await client.close();
  revalidatePath("/dashboard/admin/users");
  return { success: true };
}
