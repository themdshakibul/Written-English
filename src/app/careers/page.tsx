import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Careers</h1>
            <p className="text-xl text-muted-foreground">Join the team shaping the future of digital marketplaces.</p>
          </div>
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No open positions at the moment. Check back later.</p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
