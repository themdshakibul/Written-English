import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight mb-6">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: June 2025</p>
            <div className="space-y-6">
              <p>By accessing or using the Nexus platform, you agree to be bound by these Terms of Service.</p>
              <h2 className="text-2xl font-bold mt-8">Use of Service</h2>
              <p>You agree to use our platform only for lawful purposes and in accordance with these terms.</p>
              <h2 className="text-2xl font-bold mt-8">Intellectual Property</h2>
              <p>All content, trademarks, and intellectual property on this platform are owned by Nexus Inc. or its licensors.</p>
              <h2 className="text-2xl font-bold mt-8">Contact</h2>
              <p>For questions regarding these terms, contact us at legal@nexus.io.</p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
