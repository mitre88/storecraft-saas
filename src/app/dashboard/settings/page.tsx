"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, Check, Globe, Palette, Store } from "lucide-react";

const templates = [
  { id: "minimalist", name: "Elegance", desc: "Clean & minimal" },
  { id: "bold", name: "Vibrant", desc: "Bold & colorful" },
];

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("My Store");
  const [domain, setDomain] = useState("");
  const [template, setTemplate] = useState("minimalist");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="space-y-6 max-w-2xl">
        {/* Store Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
                <Store className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>Basic store settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Store Name</Label>
              <Input className="mt-2" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            </div>
            <div>
              <Label>Logo</Label>
              <div className="mt-2 border-2 border-dashed rounded-xl p-8 text-center hover:border-indigo-500/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
              </div>
            </div>
            <Button onClick={handleSave}>
              {saved ? <><Check className="h-4 w-4 mr-2" /> Saved!</> : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* Template */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 flex items-center justify-center">
                <Palette className="h-5 w-5 text-pink-400" />
              </div>
              <div>
                <CardTitle>Template</CardTitle>
                <CardDescription>Choose your storefront design</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    template === t.id ? "border-indigo-500 bg-indigo-500/5" : "border-muted hover:border-muted-foreground/30"
                  }`}
                >
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Domain */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <CardTitle>Custom Domain</CardTitle>
                <CardDescription>Connect your own domain</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Domain</Label>
              <Input className="mt-2" placeholder="shop.yourdomain.com" value={domain} onChange={(e) => setDomain(e.target.value)} />
            </div>
            <p className="text-xs text-muted-foreground">Add a CNAME record pointing to <code className="bg-muted px-1.5 py-0.5 rounded">cname.storecraft.app</code></p>
            <Button variant="outline">Verify Domain</Button>
          </CardContent>
        </Card>

        {/* Billing */}
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>Manage your subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-sm text-muted-foreground">Current plan:</p>
              <Badge className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-0">Free Trial</Badge>
            </div>
            <Button variant="outline">Upgrade Plan</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
