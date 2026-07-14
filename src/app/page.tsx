import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ProductCard, ProductData } from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, Zap, Globe, Users, TrendingUp, Star, Mail } from "lucide-react";

// Mock Data for the Core Listing section
const trendingItems: ProductData[] = [
  {
    id: "1",
    title: "SaaS Analytics Dashboard",
    shortDescription: "Complete analytics solution with real-time tracking, custom reports, and user segmentation.",
    price: 499,
    rating: 4.8,
    location: "Global",
    date: "Listed 2d ago",
    category: "Software",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "Premium E-commerce Template",
    shortDescription: "Next.js based highly converting e-commerce template with built-in Stripe integration.",
    price: 149,
    rating: 4.9,
    location: "US/EU",
    date: "Listed 5d ago",
    category: "Templates",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "AI Chatbot Infrastructure",
    shortDescription: "Deploy your own ChatGPT-like bot for customer service in minutes.",
    price: 899,
    rating: 5.0,
    location: "Global",
    date: "Listed 1w ago",
    category: "AI",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    title: "Fintech Mobile App UI Kit",
    shortDescription: "Over 200+ screens for modern banking, crypto, and finance applications.",
    price: 89,
    rating: 4.7,
    location: "Global",
    date: "Listed 3w ago",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />

        {/* Section 1: Features */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Platform Features</h2>
              <p className="mt-4 text-lg text-muted-foreground">Everything you need to buy and sell premium digital assets.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, title: "Secure Transactions", desc: "Escrow protection and verified sellers ensure your money is always safe." },
                { icon: Zap, title: "Instant Delivery", desc: "Automated digital asset transfer means you get access the second you pay." },
                { icon: Globe, title: "Global Reach", desc: "Connect with verified buyers and developers from over 150 countries." },
              ].map((feat, i) => (
                <Card key={i} className="border-border/50 bg-background hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
                    <p className="text-muted-foreground">{feat.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Statistics */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Active Users", value: "50K+" },
                { label: "Digital Assets", value: "10,000+" },
                { label: "Total Volume", value: "$5M+" },
                { label: "Success Rate", value: "99.9%" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-4">
                  <span className="text-4xl md:text-5xl font-extrabold mb-2">{stat.value}</span>
                  <span className="text-sm md:text-base font-medium opacity-80 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Highlights (Core Listings) */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 border-b border-border/50 pb-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <TrendingUp className="h-8 w-8 text-primary" /> Trending Assets
                </h2>
                <p className="mt-2 text-muted-foreground">The most sought-after digital properties this week.</p>
              </div>
              <Button variant="ghost" className="mt-4 sm:mt-0 text-primary hover:text-primary/80">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <ProductGrid isLoading={false}>
              {trendingItems.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </ProductGrid>
          </div>
        </section>

        {/* Section 4: Categories */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {['SaaS', 'E-commerce', 'Mobile Apps', 'AI Models', 'Web3', 'Design Kits'].map((cat, i) => (
                <div key={i} className="bg-background border border-border/50 rounded-xl p-6 text-center hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="h-12 w-12 mx-auto bg-muted rounded-full mb-3 group-hover:bg-primary/10 transition-colors" />
                  <h4 className="font-medium text-foreground group-hover:text-primary">{cat}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Services */}
        <section className="py-24 bg-background border-t border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Enterprise Services</h2>
              <p className="text-lg text-muted-foreground">
                Need something custom? Our vetted network of elite developers and agencies can build exactly what you need. From complex migrations to full-scale SaaS development.
              </p>
              <ul className="space-y-4">
                {['Custom Development', 'Technical Due Diligence', 'Post-Sale Migration', 'Code Audits'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="mt-4">Request a Quote</Button>
            </div>
            <div className="flex-1 w-full aspect-square md:aspect-auto md:h-[500px] bg-muted rounded-2xl overflow-hidden relative">
              {/* Fallback image utilizing unsplash */}
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team working" className="object-cover w-full h-full" />
            </div>
          </div>
        </section>

        {/* Section 6: Testimonials */}
        <section className="py-24 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-16">Trusted by Founders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, i) => (
                <Card key={i} className="bg-background text-left border-border/50 shadow-sm relative pt-10">
                  <div className="absolute -top-6 left-6 h-12 w-12 rounded-full border-4 border-background bg-primary/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardContent>
                    <div className="flex gap-1 text-amber-500 mb-4">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                    </div>
                    <p className="text-muted-foreground italic mb-6">
                      "Nexus completely transformed how we acquire digital assets. The escrow process was flawless and the codebase quality was exactly as advertised."
                    </p>
                    <div>
                      <p className="font-semibold text-foreground">Sarah Jenkins</p>
                      <p className="text-xs text-muted-foreground">CEO, TechNova</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Newsletter / CTA */}
        <section className="py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-primary/5 rounded-3xl p-12 border border-primary/10">
            <Mail className="h-12 w-12 mx-auto text-primary mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Never Miss a Premium Listing</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 50,000+ investors and developers. Get weekly updates on the best digital properties entering the market.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
              />
              <Button size="lg" className="h-12">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
