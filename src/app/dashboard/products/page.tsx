"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, X, Upload, Image as ImageIcon } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compareAt: number | null;
  images: string[];
  category: string | null;
  inventory: number;
  active: boolean;
  featured: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "", compareAt: "", category: "", inventory: "0", active: true,
    variants: [{ name: "", options: "" }] as { name: string; options: string }[],
  });

  const loadProducts = () => {
    fetch("/api/products").then((r) => r.json()).then(setProducts).catch(() => {});
  };

  useEffect(() => { loadProducts(); }, []);

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", compareAt: "", category: "", inventory: "0", active: true, variants: [{ name: "", options: "" }] });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      compareAt: form.compareAt ? parseFloat(form.compareAt) : null,
      category: form.category,
      inventory: parseInt(form.inventory),
      active: form.active,
    };
    const url = editing ? `/api/products/${editing.id}` : "/api/products";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    resetForm();
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    loadProducts();
  };

  const startEdit = (p: Product) => {
    setForm({
      name: p.name,
      description: p.description || "",
      price: p.price.toString(),
      compareAt: p.compareAt?.toString() || "",
      category: p.category || "",
      inventory: p.inventory.toString(),
      active: p.active,
      variants: [{ name: "", options: "" }],
    });
    setEditing(p);
    setShowForm(true);
  };

  const addVariant = () => {
    setForm({ ...form, variants: [...form.variants, { name: "", options: "" }] });
  };

  const updateVariant = (i: number, field: "name" | "options", value: string) => {
    const v = [...form.variants];
    v[i][field] = value;
    setForm({ ...form, variants: v });
  };

  const removeVariant = (i: number) => {
    setForm({ ...form, variants: form.variants.filter((_, j) => j !== i) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }} className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-0">
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8 border-indigo-500/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{editing ? "Edit Product" : "New Product"}</CardTitle>
            <Button variant="ghost" size="icon" onClick={resetForm}><X className="h-4 w-4" /></Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label>Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-1" placeholder="e.g., Classic T-Shirt" />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1" rows={3} placeholder="Describe your product..." />
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <Label>Images</Label>
                  <div className="mt-1 border-2 border-dashed rounded-xl p-8 text-center hover:border-indigo-500/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Drag & drop images or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP up to 5MB each</p>
                  </div>
                </div>

                <div>
                  <Label>Price</Label>
                  <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="mt-1" placeholder="0.00" />
                </div>
                <div>
                  <Label>Compare at Price</Label>
                  <Input type="number" step="0.01" value={form.compareAt} onChange={(e) => setForm({ ...form, compareAt: e.target.value })} className="mt-1" placeholder="0.00" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1" placeholder="e.g., Clothing" />
                </div>
                <div>
                  <Label>Inventory</Label>
                  <Input type="number" value={form.inventory} onChange={(e) => setForm({ ...form, inventory: e.target.value })} className="mt-1" />
                </div>
              </div>

              {/* Variants */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Variants</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                    <Plus className="h-3 w-3 mr-1" /> Add Variant
                  </Button>
                </div>
                <div className="space-y-3">
                  {form.variants.map((v, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Input
                        placeholder="e.g., Size"
                        value={v.name}
                        onChange={(e) => updateVariant(i, "name", e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="e.g., S, M, L, XL"
                        value={v.options}
                        onChange={(e) => updateVariant(i, "options", e.target.value)}
                        className="flex-[2]"
                      />
                      {form.variants.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(i)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground">Separate options with commas</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-0">
                  {editing ? "Update" : "Create"} Product
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3">
        {products.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-1">No products yet</p>
              <p className="text-sm text-muted-foreground mb-6">Create your first product to get started</p>
              <Button onClick={() => { resetForm(); setShowForm(true); }}>
                <Plus className="h-4 w-4 mr-2" /> Add Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          products.map((p) => (
            <Card key={p.id} className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-lg font-bold">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt="" className="h-full w-full object-cover rounded-lg" />
                    ) : (
                      p.name[0]
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-semibold">{formatPrice(p.price)}</span>
                      {p.compareAt && <span className="text-xs text-muted-foreground line-through">{formatPrice(p.compareAt)}</span>}
                      <Badge variant={p.active ? "default" : "secondary"} className="text-xs">
                        {p.active ? "Active" : "Draft"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{p.inventory} in stock</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => startEdit(p)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="hover:text-red-400"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
