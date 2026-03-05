"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, X } from "lucide-react";
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
  });

  const loadProducts = () => {
    fetch("/api/products").then((r) => r.json()).then(setProducts).catch(() => {});
  };

  useEffect(() => { loadProducts(); }, []);

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", compareAt: "", category: "", inventory: "0", active: true });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      ...form,
      price: parseFloat(form.price),
      compareAt: form.compareAt ? parseFloat(form.compareAt) : null,
      inventory: parseInt(form.inventory),
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
    });
    setEditing(p);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{editing ? "Edit Product" : "New Product"}</CardTitle>
            <Button variant="ghost" size="icon" onClick={resetForm}><X className="h-4 w-4" /></Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-1" />
              </div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Price</Label>
                <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="mt-1" />
              </div>
              <div>
                <Label>Compare at Price</Label>
                <Input type="number" step="0.01" value={form.compareAt} onChange={(e) => setForm({ ...form, compareAt: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Category</Label>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Inventory</Label>
                <Input type="number" value={form.inventory} onChange={(e) => setForm({ ...form, inventory: e.target.value })} className="mt-1" />
              </div>
              <div className="md:col-span-2">
                <Button type="submit">{editing ? "Update" : "Create"} Product</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {products.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No products yet. Create your first product!</CardContent></Card>
        ) : (
          products.map((p) => (
            <Card key={p.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-lg font-bold">
                    {p.name[0]}
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
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => startEdit(p)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
