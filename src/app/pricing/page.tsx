import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free", price: "$0", description: "Get started with basic access.",
    features: ["Browse marketplace", "5 downloads/month", "Basic support"],
  },
  {
    name: "Pro", price: "$29", description: "For serious creators and developers.",
    features: ["Unlimited downloads", "Priority support", "Custom licensing", "Early access to new items"],
    popular: true,
  },
  {
    name: "Enterprise", price: "$99", description: "For teams and organizations.",
    features: ["Everything in Pro", "Team accounts", "API access", "Dedicated account manager", "Custom invoices"],
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Pricing Plans</h1>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative p-8 rounded-2xl border ${plan.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border"} bg-card`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">Most Popular</span>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                  <Link href={plan.name === "Free" ? "/register" : "/contact"}>
                    {plan.name === "Free" ? "Get Started" : "Contact Us"}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
