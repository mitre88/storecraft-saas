"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, ArrowRight, ArrowLeft, Check, Store, Palette, Sparkles, Star } from "lucide-react";

const categories = [
  { name: "Fashion & Apparel", emoji: "👗" },
  { name: "Electronics", emoji: "📱" },
  { name: "Home & Garden", emoji: "🏡" },
  { name: "Health & Beauty", emoji: "✨" },
  { name: "Food & Beverage", emoji: "🍜" },
  { name: "Art & Crafts", emoji: "🎨" },
  { name: "Sports & Outdoors", emoji: "⚽" },
  { name: "Books & Media", emoji: "📚" },
  { name: "Jewelry & Accessories", emoji: "💎" },
  { name: "Toys & Games", emoji: "🎮" },
];

const templates = [
  {
    id: "minimalist",
    name: "Elegance",
    desc: "Luxury feel with serif fonts, muted tones, and large product imagery",
    preview: "https://picsum.photos/400/250?random=10",
    tags: ["Minimal", "Luxury", "Clean"],
  },
  {
    id: "bold",
    name: "Vibrant",
    desc: "Bold colors, dynamic layouts, and eye-catching product displays",
    preview: "https://picsum.photos/400/250?random=11",
    tags: ["Bold", "Colorful", "Modern"],
  },
];

const presetPalettes = [
  { name: "Indigo Night", primary: "#4f46e5", accent: "#8b5cf6" },
  { name: "Ocean Breeze", primary: "#0891b2", accent: "#06b6d4" },
  { name: "Forest", primary: "#166534", accent: "#22c55e" },
  { name: "Sunset", primary: "#ea580c", accent: "#f59e0b" },
  { name: "Rose", primary: "#be185d", accent: "#f43f5e" },
  { name: "Slate", primary: "#1e293b", accent: "#64748b" },
  { name: "Midnight", primary: "#000000", accent: "#3b82f6" },
  { name: "Lavender", primary: "#7c3aed", accent: "#c084fc" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    template: "minimalist",
    primaryColor: "#4f46e5",
    secondaryColor: "#ffffff",
    accentColor: "#8b5cf6",
  });

  const steps = [
    { title: "Name Your Store", subtitle: "Choose a memorable name", icon: Store },
    { title: "Choose Category", subtitle: "What will you sell?", icon: Sparkles },
    { title: "Pick a Template", subtitle: "Set the vibe", icon: Palette },
    { title: "Customize Colors", subtitle: "Make it yours", icon: Palette },
  ];

  const canProceed = () => {
    if (step === 0) return form.name.trim().length > 0;
    if (step === 1) return form.category.length > 0;
    return true;
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(`/dashboard?store=${data.id}`);
      }
    } catch {
      console.error("Failed to create store");
    } finally {
      setLoading(false);
    }
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="hidden lg:flex w-80 bg-gradient-to-b from-indigo-600 via-violet-600 to-purple-700 flex-col p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-12">
            <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg">StoreCraft</span>
          </div>
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={s.title} className="flex items-start gap-4">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300 ${
                  i < step ? "bg-white text-indigo-600" : i === step ? "bg-white/20 text-white ring-2 ring-white/40" : "bg-white/5 text-white/30"
                }`}>
                  {i < step ? <Check className="h-5 w-5" /> : i + 1}
                </div>
                <div className={`pt-1.5 transition-all ${i <= step ? "opacity-100" : "opacity-40"}`}>
                  <span className="font-semibold text-sm block">{s.title}</span>
                  <span className="text-xs text-white/60">{s.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-16">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-1 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-yellow-300 text-yellow-300" />)}
              </div>
              <p className="text-xs text-white/80 italic leading-relaxed">&ldquo;Set up my entire store in 10 minutes. Incredible.&rdquo;</p>
              <p className="text-xs text-white/50 mt-2">— Sarah C., Bloom Botanics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
          <div className="w-full max-w-lg">
            {/* Mobile step indicator */}
            <div className="lg:hidden flex items-center gap-2 mb-6">
              {steps.map((_, i) => (
                <div key={i} className={`h-2 flex-1 rounded-full transition-all ${i <= step ? "bg-gradient-to-r from-indigo-500 to-violet-600" : "bg-muted"}`} />
              ))}
            </div>

            <div className="mb-8">
              <p className="text-sm text-indigo-400 font-medium mb-2">Step {step + 1} of {steps.length}</p>
              <h1 className="text-3xl sm:text-4xl font-bold">{steps[step].title}</h1>
              <p className="text-muted-foreground mt-1">{steps[step].subtitle}</p>
            </div>

            {step === 0 && (
              <div className="space-y-4 animate-fade-in-up">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Store Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Luna Boutique"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-2 text-lg h-14 border-2 focus:border-indigo-500 transition-colors"
                    autoFocus
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  This will be your store&apos;s display name. You can always change it later.
                </p>
                {form.name && (
                  <div className="bg-muted/50 rounded-xl p-4 border animate-fade-in-up">
                    <p className="text-xs text-muted-foreground mb-1">Your store URL</p>
                    <p className="font-mono text-sm">
                      storecraft.app/<span className="text-indigo-400">{form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="grid grid-cols-2 gap-3 animate-fade-in-up">
                {categories.map((cat) => (
                  <Card
                    key={cat.name}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                      form.category === cat.name ? "border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-500/10" : "hover:border-muted-foreground/20"
                    }`}
                    onClick={() => setForm({ ...form, category: cat.name })}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-1">{cat.emoji}</div>
                      <p className="text-sm font-medium">{cat.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in-up">
                {templates.map((t) => (
                  <Card
                    key={t.id}
                    className={`cursor-pointer transition-all duration-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 ${
                      form.template === t.id ? "border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-500/10" : "hover:border-muted-foreground/20"
                    }`}
                    onClick={() => setForm({ ...form, template: t.id })}
                  >
                    <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                      <img src={t.preview} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                      {form.template === t.id && (
                        <div className="absolute inset-0 bg-indigo-500/10 flex items-center justify-center">
                          <div className="bg-indigo-500 text-white rounded-full p-2">
                            <Check className="h-6 w-6" />
                          </div>
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">{t.name}</CardTitle>
                          <CardDescription className="mt-1">{t.desc}</CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {t.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">{tag}</span>
                        ))}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-fade-in-up">
                {/* Preset palettes */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Quick Palettes</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {presetPalettes.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => setForm({ ...form, primaryColor: p.primary, accentColor: p.accent })}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                          form.primaryColor === p.primary && form.accentColor === p.accent ? "border-indigo-500 shadow-lg" : "border-transparent hover:border-muted-foreground/20"
                        }`}
                      >
                        <div className="flex -space-x-1">
                          <div className="h-6 w-6 rounded-full border-2 border-background shadow-sm" style={{ backgroundColor: p.primary }} />
                          <div className="h-6 w-6 rounded-full border-2 border-background shadow-sm" style={{ backgroundColor: p.accent }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom color pickers */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Or pick custom colors</Label>
                  {[
                    { key: "primaryColor" as const, label: "Primary" },
                    { key: "accentColor" as const, label: "Accent" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-4 bg-muted/30 rounded-xl p-3">
                      <input
                        type="color"
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="h-10 w-10 rounded-lg cursor-pointer border-0"
                      />
                      <div className="flex-1">
                        <Label className="text-sm">{label}</Label>
                        <p className="text-xs text-muted-foreground font-mono">{form[key]}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preview */}
                <div className="rounded-xl border bg-muted/20 p-6">
                  <p className="text-xs text-muted-foreground mb-4 font-medium">Live Preview</p>
                  <div className="bg-background rounded-lg border overflow-hidden">
                    <div className="h-3 w-full" style={{ background: `linear-gradient(135deg, ${form.primaryColor}, ${form.accentColor})` }} />
                    <div className="p-4 space-y-3">
                      <div className="h-3 w-24 rounded-full" style={{ backgroundColor: form.primaryColor }} />
                      <div className="h-2 w-full rounded-full bg-muted" />
                      <div className="h-2 w-3/4 rounded-full bg-muted" />
                      <div className="mt-4 flex gap-2">
                        <div className="h-8 px-4 rounded-lg flex items-center text-white text-xs font-medium" style={{ backgroundColor: form.primaryColor }}>
                          Button
                        </div>
                        <div className="h-8 px-4 rounded-lg flex items-center text-white text-xs font-medium" style={{ backgroundColor: form.accentColor }}>
                          Accent
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-10">
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              {step < steps.length - 1 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white border-0 shadow-lg shadow-indigo-500/25 px-8"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleCreate}
                  disabled={loading}
                  className="gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white border-0 shadow-lg shadow-indigo-500/25 px-8"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Store <Sparkles className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
