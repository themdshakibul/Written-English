import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight mb-6">Cookie Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: June 2025</p>
            <div className="space-y-6">
              <p>Nexus uses cookies and similar tracking technologies to enhance your experience on our platform.</p>
              <h2 className="text-2xl font-bold mt-8">What Are Cookies</h2>
              <p>Cookies are small text files stored on your device that help us remember your preferences and improve your browsing experience.</p>
              <h2 className="text-2xl font-bold mt-8">Managing Cookies</h2>
              <p>You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of our platform.</p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
