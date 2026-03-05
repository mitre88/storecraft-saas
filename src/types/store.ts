export interface StoreProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compareAt: number | null;
  images: string[];
  category: string | null;
  featured: boolean;
}

export interface StoreData {
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  products: StoreProduct[];
}
