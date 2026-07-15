import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export default function TrendingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Trending Now</h1>
            <p className="text-xl text-muted-foreground">Discover the most popular items on Nexus.</p>
          </div>
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">Head over to the marketplace to see what&apos;s trending.</p>
            <Link href="/explore" className="text-primary font-medium hover:underline">Browse Marketplace →</Link>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
