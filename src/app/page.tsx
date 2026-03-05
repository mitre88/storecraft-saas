"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Zap,
  Palette,
  BarChart3,
  Shield,
  Globe,
  ArrowRight,
  Check,
  Star,
  Sparkles,
} from "lucide-react";

const features = [
  { icon: Zap, title: "Launch in Minutes", desc: "Go from idea to live store in under 5 minutes with our guided setup wizard." },
  { icon: Palette, title: "Beautiful Templates", desc: "Choose from professionally designed templates that convert visitors into customers." },
  { icon: BarChart3, title: "Built-in Analytics", desc: "Track sales, orders, and customer behavior with real-time dashboards." },
  { icon: Shield, title: "Secure Payments", desc: "Stripe-powered checkout with PCI compliance built in." },
  { icon: Globe, title: "Custom Domains", desc: "Use your own domain or our free subdomain to reach customers worldwide." },
  { icon: ShoppingBag, title: "Inventory Management", desc: "Manage products, variants, and stock levels from one dashboard." },
];

const plans = [
  {
    name: "Starter",
    price: 29,
    desc: "Perfect for new businesses",
    features: ["Up to 100 products", "1 store", "Basic analytics", "Email support", "Free SSL"],
    popular: false,
  },
  {
    name: "Pro",
    price: 79,
    desc: "For growing businesses",
    features: ["Unlimited products", "3 stores", "Advanced analytics", "Priority support", "Custom domain", "No transaction fees"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 199,
    desc: "For large operations",
    features: ["Unlimited everything", "10 stores", "White-label", "Dedicated support", "API access", "Custom integrations"],
    popular: false,
  },
];

const testimonials = [
  { name: "Sarah Chen", role: "Founder, Bloom Botanics", text: "StoreCraft helped me launch my plant shop in a single afternoon. Sales tripled in the first month.", rating: 5 },
  { name: "Marcus Rivera", role: "CEO, UrbanThreads", text: "The templates are stunning. Our customers constantly compliment the shopping experience.", rating: 5 },
  { name: "Aisha Patel", role: "Owner, SpiceRoute", text: "Moving from Shopify saved us $500/month. StoreCraft has everything we need and more.", rating: 5 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">StoreCraft</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/onboarding">
              <Button size="sm">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" /> Now with AI-powered store setup
          </Badge>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Build Your Dream Store Today
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The all-in-one platform to create, manage, and scale your online store.
            No coding required. Beautiful by default.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/store/demo">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Demo Store
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">14-day free trial · No credit card required</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Sell Online</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you build, launch, and grow your online business.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                  <CardDescription>{f.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Start free, scale as you grow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.desc}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/onboarding" className="block mt-6">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Entrepreneurs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of entrepreneurs who chose StoreCraft to power their online business.
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="text-lg px-8">
              Create Your Store Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="font-semibold">StoreCraft</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StoreCraft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
