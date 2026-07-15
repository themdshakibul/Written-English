import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";

const categories = [
  "SaaS Templates", "AI Models", "Design Assets", "Boilerplates",
  "UI Components", "APIs", "Mobile Templates", "WordPress Themes",
];

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Categories</h1>
            <p className="text-xl text-muted-foreground">Browse our marketplace by category.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <a key={cat} href={`/explore?category=${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all text-center">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{cat}</h3>
              </a>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
