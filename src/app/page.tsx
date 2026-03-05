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
  Package,
  X,
  ChevronRight,
  Users,
  Store,
  CreditCard,
  Headphones,
  Github,
  Twitter,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: Zap, title: "Launch in Minutes", desc: "Go from idea to live store in under 5 minutes with our guided setup wizard.", color: "from-amber-500 to-orange-600" },
  { icon: Palette, title: "Stunning Templates", desc: "Hand-crafted templates designed by world-class designers that actually convert.", color: "from-pink-500 to-rose-600" },
  { icon: BarChart3, title: "Deep Analytics", desc: "Real-time dashboards with revenue tracking, customer insights, and conversion funnels.", color: "from-emerald-500 to-teal-600" },
  { icon: Shield, title: "Bank-Grade Security", desc: "Stripe-powered checkout with PCI compliance, fraud detection, and SSL encryption.", color: "from-blue-500 to-indigo-600" },
  { icon: Globe, title: "Custom Domains", desc: "Your brand, your domain. Free SSL certificates and global CDN included.", color: "from-violet-500 to-purple-600" },
  { icon: Package, title: "Smart Inventory", desc: "AI-powered stock predictions, variant management, and automatic reorder alerts.", color: "from-cyan-500 to-blue-600" },
];

const plans = [
  {
    name: "Starter",
    price: 29,
    desc: "For side projects & small shops",
    features: ["Up to 100 products", "1 storefront", "Basic analytics", "Email support", "Free SSL", "2% transaction fee"],
    missing: ["Custom domain", "Priority support", "API access", "White-label"],
    popular: false,
  },
  {
    name: "Pro",
    price: 79,
    desc: "For serious businesses",
    features: ["Unlimited products", "3 storefronts", "Advanced analytics", "Priority support", "Custom domain", "0% transaction fees", "API access"],
    missing: ["White-label"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 199,
    desc: "For scaling operations",
    features: ["Unlimited everything", "10 storefronts", "White-label", "Dedicated account manager", "API access", "Custom integrations", "SLA guarantee", "SSO"],
    missing: [],
    popular: false,
  },
];

const testimonials = [
  { name: "Sarah Chen", role: "Founder, Bloom Botanics", text: "StoreCraft helped me launch my plant shop in a single afternoon. Sales tripled in the first month.", rating: 5, avatar: "SC" },
  { name: "Marcus Rivera", role: "CEO, UrbanThreads", text: "The templates are stunning. Our customers constantly compliment the shopping experience.", rating: 5, avatar: "MR" },
  { name: "Aisha Patel", role: "Owner, SpiceRoute", text: "Moving from Shopify saved us $500/month. StoreCraft has everything we need and more.", rating: 5, avatar: "AP" },
  { name: "James O'Brien", role: "Co-founder, CraftBrew Co", text: "The analytics alone are worth the price. We optimized our funnel and doubled conversion rates.", rating: 5, avatar: "JO" },
  { name: "Yuki Tanaka", role: "Designer, Studio Mochi", text: "Finally a platform that doesn't fight my design vision. Full creative control with zero code.", rating: 5, avatar: "YT" },
  { name: "Elena Vasquez", role: "Founder, Sol Jewelry", text: "Went from $0 to $50k/month in 6 months. StoreCraft made scaling feel effortless.", rating: 5, avatar: "EV" },
];

const stats = [
  { label: "Active Stores", value: "12,000+", icon: Store },
  { label: "Products Sold", value: "2.4M+", icon: Package },
  { label: "Happy Merchants", value: "8,500+", icon: Users },
  { label: "Processed Revenue", value: "$180M+", icon: CreditCard },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function AnimatedSection({ children, className = "", delay = "" }: { children: React.ReactNode; className?: string; delay?: string }) {
  const { ref, isVisible } = useInView();
  return (
    <div ref={ref} className={`${isVisible ? `animate-fade-in-up ${delay}` : "opacity-0"} ${className}`}>
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">StoreCraft</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign In</Button>
            </Link>
            <Link href="/onboarding">
              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white border-0 shadow-lg shadow-indigo-500/25">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="h-5 w-5" /> : <span className="text-xl">☰</span>}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-xl p-4 space-y-3">
            <a href="#features" className="block py-2 text-sm" onClick={() => setMobileMenu(false)}>Features</a>
            <a href="#pricing" className="block py-2 text-sm" onClick={() => setMobileMenu(false)}>Pricing</a>
            <a href="#testimonials" className="block py-2 text-sm" onClick={() => setMobileMenu(false)}>Testimonials</a>
            <Link href="/auth/signin" className="block py-2 text-sm" onClick={() => setMobileMenu(false)}>Sign In</Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-4 relative">
        {/* Animated gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-purple-500/5 animate-gradient" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto text-center relative">
          <AnimatedSection>
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/15">
              <Sparkles className="mr-2 h-3.5 w-3.5" /> Now with AI-powered store setup
            </Badge>
          </AnimatedSection>
          <AnimatedSection delay="animate-delay-100">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[0.95]">
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">Your store,</span>
              <br />
              <span className="text-foreground">your masterpiece.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay="animate-delay-200">
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              The all-in-one commerce platform for creators and entrepreneurs. 
              Launch a stunning online store in minutes — no code, no compromise.
            </p>
          </AnimatedSection>
          <AnimatedSection delay="animate-delay-300">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onboarding">
                <Button size="lg" className="text-lg px-8 h-14 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white border-0 shadow-xl shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:scale-[1.02]">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/store/demo">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14 hover:scale-[1.02] transition-all">
                  View Demo Store
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-5">14-day free trial · No credit card required · Cancel anytime</p>
          </AnimatedSection>

          {/* Mockup Screenshot */}
          <AnimatedSection delay="animate-delay-400" className="mt-16">
            <div className="relative mx-auto max-w-4xl">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-white/10 bg-gradient-to-b from-neutral-900 to-neutral-950">
                <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900/80 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-flex items-center gap-2 bg-neutral-800 rounded-lg px-4 py-1 text-xs text-neutral-400">
                      <span>🔒</span> mystore.storecraft.app
                    </div>
                  </div>
                </div>
                <img 
                  src="https://picsum.photos/1200/700?random=42" 
                  alt="StoreCraft Dashboard Preview" 
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              {/* Floating cards */}
              <div className="absolute -left-8 top-1/3 hidden lg:block animate-float">
                <div className="bg-background/90 backdrop-blur-xl rounded-xl shadow-xl border p-4 w-48">
                  <div className="text-xs text-muted-foreground mb-1">Revenue today</div>
                  <div className="text-2xl font-bold text-emerald-500">$2,847</div>
                  <div className="text-xs text-emerald-500 mt-1">↑ 24% vs yesterday</div>
                </div>
              </div>
              <div className="absolute -right-8 top-1/2 hidden lg:block animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="bg-background/90 backdrop-blur-xl rounded-xl shadow-xl border p-4 w-48">
                  <div className="text-xs text-muted-foreground mb-1">New orders</div>
                  <div className="text-2xl font-bold">47</div>
                  <div className="text-xs text-indigo-400 mt-1">↑ 12 in the last hour</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-16 px-4 border-y bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-10">
              Trusted by 12,000+ stores worldwide
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={`animate-delay-${(i + 1) * 100}` as string}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 mb-3">
                    <stat.icon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Features</Badge>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">Everything You Need to Dominate Online</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed by merchants, for merchants. No compromises.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={`animate-delay-${Math.min((i + 1) * 100, 500)}` as string}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-background to-muted/30 group cursor-default">
                  <CardHeader>
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                      <f.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{f.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{f.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Pricing</Badge>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Start free. Scale infinitely. No hidden fees.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {plans.map((plan) => (
              <AnimatedSection key={plan.name}>
                <Card className={`relative transition-all duration-300 hover:-translate-y-1 ${plan.popular ? "border-indigo-500 shadow-xl shadow-indigo-500/10 pulse-glow scale-[1.02]" : "hover:shadow-lg"}`}>
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-0 px-4 py-1 shadow-lg">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.desc}</CardDescription>
                    <div className="pt-4 pb-2">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link href="/onboarding" className="block mb-6">
                      <Button className={`w-full h-12 text-base ${plan.popular ? "bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white border-0 shadow-lg" : ""}`} variant={plan.popular ? "default" : "outline"}>
                        Get Started <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm">
                          <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-emerald-500" />
                          </div>
                          {f}
                        </li>
                      ))}
                      {plan.missing.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground/50">
                          <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <X className="h-3 w-3 text-muted-foreground/30" />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Testimonials</Badge>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">Loved by 8,500+ Entrepreneurs</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={`animate-delay-${Math.min((i + 1) * 100, 500)}` as string}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-b from-background to-muted/20">
                  <CardContent className="pt-6">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm mb-5 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-purple-500/5" />
        <div className="max-w-3xl mx-auto text-center relative">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              Ready to build something{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">extraordinary</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Join 12,000+ merchants who chose StoreCraft. Your next chapter starts here.
            </p>
            <Link href="/onboarding">
              <Button size="lg" className="text-lg px-10 h-14 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white border-0 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all">
                Create Your Store Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-16 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">StoreCraft</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">The modern commerce platform for creators and entrepreneurs.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} StoreCraft. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="h-4 w-4" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Headphones className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
