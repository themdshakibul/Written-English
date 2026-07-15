import { NextResponse } from "next/server";

export async function GET() {
  const mongodbUri = process.env.MONGODB_URI;
  const betterAuthUrl = process.env.BETTER_AUTH_URL;
  const nextPublicAppUrl = process.env.NEXT_PUBLIC_APP_URL;
  const betterAuthSecret = process.env.BETTER_AUTH_SECRET;
  const vercelUrl = process.env.VERCEL_URL;
  const vercelProdUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  let mongoOk = false;
  let mongoError = "";

  try {
    if (mongodbUri) {
      const { MongoClient } = await import("mongodb");
      const client = new MongoClient(mongodbUri);
      await client.connect();
      await client.db().command({ ping: 1 });
      await client.close();
      mongoOk = true;
    }
  } catch (e: unknown) {
    mongoError = e instanceof Error ? e.message : "Unknown error";
  }

  return NextResponse.json({
    env: {
      MONGODB_URI: mongodbUri ? "SET" : "MISSING",
      BETTER_AUTH_URL: betterAuthUrl || "MISSING",
      NEXT_PUBLIC_APP_URL: nextPublicAppUrl || "MISSING",
      BETTER_AUTH_SECRET: betterAuthSecret ? "SET" : "MISSING",
      VERCEL_URL: vercelUrl || "not set",
      VERCEL_PROJECT_PRODUCTION_URL: vercelProdUrl || "not set",
    },
    mongodb: {
      connected: mongoOk,
      error: mongoError || null,
    },
    resolved: {
      authBaseURL: betterAuthUrl || (vercelProdUrl ? `https://${vercelProdUrl}` : "not set"),
    },
  });
}
