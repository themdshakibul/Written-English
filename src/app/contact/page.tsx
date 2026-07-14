"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have a question about an asset, or want to partner with us? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <Card className="border-border/60 shadow-lg">
              <CardContent className="p-8">
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="h-16 w-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                    <Button className="mt-8" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <Input required placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <Input required placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input type="email" required placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input required placeholder="How can we help you?" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea required className="min-h-[150px]" placeholder="Write your message here..." />
                    </div>
                    <Button type="submit" size="lg" className="w-full text-base">Send Message</Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Details */}
            <div className="flex flex-col justify-center space-y-8 lg:pl-10">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="text-muted-foreground mb-8">
                  Fill out the form and our team will get back to you within 24 hours. For urgent inquiries, please call our support line.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Headquarters</h4>
                    <p className="text-muted-foreground">123 Tech Boulevard, Suite 400<br />San Francisco, CA 94107</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <p className="text-muted-foreground">+1 (800) 123-4567<br />Mon-Fri from 8am to 5pm PST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <p className="text-muted-foreground">support@nexus-marketplace.com<br />partnerships@nexus-marketplace.com</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
