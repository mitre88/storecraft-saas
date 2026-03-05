"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, ArrowRight, ArrowLeft, Check, Store, Palette, Sparkles } from "lucide-react";

const categories = [
  "Fashion & Apparel", "Electronics", "Home & Garden", "Health & Beauty",
  "Food & Beverage", "Art & Crafts", "Sports & Outdoors", "Books & Media",
  "Jewelry & Accessories", "Toys & Games",
];

const templates = [
  { id: "minimalist", name: "Modern Minimalist", desc: "Clean lines, lots of whitespace, typography-focused", color: "bg-neutral-100 dark:bg-neutral-900" },
  { id: "bold", name: "Bold & Colorful", desc: "Vibrant colors, dynamic layouts, eye-catching design", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    template: "minimalist",
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    accentColor: "#3b82f6",
  });

  const steps = [
    { title: "Name Your Store", icon: Store },
    { title: "Choose Category", icon: Sparkles },
    { title: "Pick a Template", icon: Palette },
    { title: "Customize Colors", icon: Palette },
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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="hidden lg:flex w-80 bg-muted/50 border-r flex-col p-8">
        <div className="flex items-center gap-2 mb-12">
          <ShoppingBag className="h-6 w-6" />
          <span className="font-bold text-lg">StoreCraft</span>
        </div>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={s.title} className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={i <= step ? "font-medium" : "text-muted-foreground"}>{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-1">Step {step + 1} of {steps.length}</p>
            <h1 className="text-3xl font-bold">{steps[step].title}</h1>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Store Name</Label>
                <Input
                  id="name"
                  placeholder="My Awesome Store"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 text-lg h-12"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                This will be your store&apos;s display name. You can change it later.
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <Card
                  key={cat}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    form.category === cat ? "border-primary ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setForm({ ...form, category: cat })}
                >
                  <CardContent className="p-4 text-center">
                    <p className="text-sm font-medium">{cat}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {templates.map((t) => (
                <Card
                  key={t.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    form.template === t.id ? "border-primary ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setForm({ ...form, template: t.id })}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`h-16 w-16 rounded-lg ${t.color}`} />
                      <div>
                        <CardTitle className="text-base">{t.name}</CardTitle>
                        <CardDescription>{t.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {[
                { key: "primaryColor" as const, label: "Primary Color" },
                { key: "accentColor" as const, label: "Accent Color" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-4">
                  <input
                    type="color"
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="h-12 w-12 rounded-lg cursor-pointer border-0"
                  />
                  <div>
                    <Label>{label}</Label>
                    <p className="text-sm text-muted-foreground">{form[key]}</p>
                  </div>
                </div>
              ))}
              <div className="mt-8 p-6 rounded-xl border">
                <p className="text-sm text-muted-foreground mb-3">Preview</p>
                <div className="flex gap-3">
                  <div className="h-20 w-20 rounded-lg" style={{ backgroundColor: form.primaryColor }} />
                  <div className="h-20 w-20 rounded-lg" style={{ backgroundColor: form.accentColor }} />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleCreate} disabled={loading}>
                {loading ? "Creating..." : "Create Store"} <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
