import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: June 2025</p>
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
              <p>Nexus Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform.</p>
              <h2 className="text-2xl font-bold mt-8">Information We Collect</h2>
              <p>We collect personal information that you voluntarily provide when registering, including your name, email address, and payment information.</p>
              <h2 className="text-2xl font-bold mt-8">How We Use Your Information</h2>
              <p>We use your information to provide and maintain our services, process transactions, send you updates, and improve our platform.</p>
              <h2 className="text-2xl font-bold mt-8">Contact</h2>
              <p>If you have questions about this Privacy Policy, please contact us at privacy@nexus.io.</p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
