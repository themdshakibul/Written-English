import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const isProd = process.env.NODE_ENV === "production";

function getBaseURL(): string {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (isProd) console.warn("BETTER_AUTH_URL should be set in production");
  return "http://localhost:3000";
}

const baseURL = getBaseURL();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not set");

const g = globalThis as unknown as { __mongoClient?: MongoClient };
if (!g.__mongoClient) {
  g.__mongoClient = new MongoClient(MONGODB_URI);
}
const client = g.__mongoClient;

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  baseURL,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false,
      },
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "lax",
      path: "/",
      secure: isProd,
    },
  },
  trustedOrigins: (() => {
    const origins = [baseURL];
    if (process.env.VERCEL_URL) origins.push(`https://${process.env.VERCEL_URL}`);
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) origins.push(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
    return origins;
  })(),
});
