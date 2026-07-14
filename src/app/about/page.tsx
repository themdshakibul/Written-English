import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Users, Target, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Empowering the Next Generation of Builders</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Nexus is the premier digital marketplace for buying, selling, and managing high-quality SaaS templates, AI models, and design assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that great software shouldn't have to be built from scratch every single time. Our mission is to accelerate global innovation by providing developers and entrepreneurs with the highest quality, production-ready starting points.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Target, text: "Vetted quality for every single asset." },
                  { icon: Zap, text: "Instant delivery and seamless licensing." },
                  { icon: Globe, text: "A truly global community of elite creators." },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                alt="Our Team" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="bg-muted/30 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-12">Meet the Leadership</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { name: "Sarah Jenkins", role: "Chief Executive Officer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300" },
                { name: "Michael Chang", role: "Chief Technology Officer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" },
                { name: "Elena Rodriguez", role: "Head of Design", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" },
              ].map((member, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full overflow-hidden mb-4 border-4 border-background shadow-lg">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
