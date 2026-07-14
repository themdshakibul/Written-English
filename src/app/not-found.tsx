import Link from "next/link";
import { SearchX } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 items-center justify-center py-16">
        <Container>
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <SearchX className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-4 text-6xl font-extrabold tracking-tight text-foreground">
              404
            </h1>
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Page Not Found
            </h2>
            <p className="mb-8 max-w-md text-lg text-muted-foreground leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/">Go Home</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/explore">Explore Items</Link>
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
