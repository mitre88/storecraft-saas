export interface DemoProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAt?: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  sizes?: string[];
  colors?: string[];
  featured: boolean;
}

export const demoProducts: DemoProduct[] = [
  {
    id: "1",
    name: "Classic Leather Jacket",
    slug: "classic-leather-jacket",
    description: "Premium full-grain leather jacket with a timeless silhouette. Features a YKK zipper, interior pockets, and quilted lining for warmth. Crafted by artisan leatherworkers in Italy.",
    price: 299.99,
    compareAt: 449.99,
    images: [
      "https://picsum.photos/seed/leather1/800/1000",
      "https://picsum.photos/seed/leather2/800/1000",
      "https://picsum.photos/seed/leather3/800/1000",
    ],
    category: "Outerwear",
    rating: 4.8,
    reviews: 124,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Brown", "Tan"],
    featured: true,
  },
  {
    id: "2",
    name: "Minimalist Canvas Sneakers",
    slug: "minimalist-canvas-sneakers",
    description: "Clean, versatile canvas sneakers with a vulcanized rubber sole. Designed for all-day comfort with memory foam insoles and reinforced stitching.",
    price: 89.00,
    images: [
      "https://picsum.photos/seed/sneaker1/800/1000",
      "https://picsum.photos/seed/sneaker2/800/1000",
    ],
    category: "Footwear",
    rating: 4.6,
    reviews: 89,
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Navy"],
    featured: true,
  },
  {
    id: "3",
    name: "Organic Cotton Hoodie",
    slug: "organic-cotton-hoodie",
    description: "Ultra-soft 100% organic cotton french terry hoodie. Garment-dyed for a lived-in feel. Oversized fit with kangaroo pocket and adjustable drawstring hood.",
    price: 78.00,
    compareAt: 95.00,
    images: [
      "https://picsum.photos/seed/hoodie1/800/1000",
      "https://picsum.photos/seed/hoodie2/800/1000",
    ],
    category: "Tops",
    rating: 4.9,
    reviews: 203,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Sage", "Oat", "Charcoal", "Sky Blue"],
    featured: true,
  },
  {
    id: "4",
    name: "Ceramic Pour-Over Set",
    slug: "ceramic-pour-over-set",
    description: "Handmade ceramic pour-over coffee dripper with matching carafe. Each piece is individually wheel-thrown and glazed. Makes 2-4 cups of perfectly brewed coffee.",
    price: 64.00,
    images: [
      "https://picsum.photos/seed/ceramic1/800/1000",
      "https://picsum.photos/seed/ceramic2/800/1000",
    ],
    category: "Home",
    rating: 4.7,
    reviews: 56,
    featured: false,
  },
  {
    id: "5",
    name: "Merino Wool Beanie",
    slug: "merino-wool-beanie",
    description: "Lightweight merino wool beanie that regulates temperature naturally. Itch-free, moisture-wicking, and perfect for any season.",
    price: 38.00,
    images: [
      "https://picsum.photos/seed/beanie1/800/1000",
      "https://picsum.photos/seed/beanie2/800/1000",
    ],
    category: "Accessories",
    rating: 4.5,
    reviews: 167,
    colors: ["Black", "Gray", "Burgundy", "Forest"],
    featured: false,
  },
  {
    id: "6",
    name: "Slim Fit Chino Pants",
    slug: "slim-fit-chino-pants",
    description: "Modern slim-fit chinos made from stretch twill cotton. Features a comfort waistband, hidden coin pocket, and reinforced seams for durability.",
    price: 68.00,
    compareAt: 85.00,
    images: [
      "https://picsum.photos/seed/chino1/800/1000",
      "https://picsum.photos/seed/chino2/800/1000",
    ],
    category: "Bottoms",
    rating: 4.4,
    reviews: 312,
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Khaki", "Navy", "Olive", "Black"],
    featured: true,
  },
  {
    id: "7",
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    description: "Compact vegetable-tanned leather crossbody with adjustable strap. Features brass hardware, magnetic closure, and interior card slots.",
    price: 145.00,
    images: [
      "https://picsum.photos/seed/bag1/800/1000",
      "https://picsum.photos/seed/bag2/800/1000",
      "https://picsum.photos/seed/bag3/800/1000",
    ],
    category: "Accessories",
    rating: 4.8,
    reviews: 78,
    colors: ["Cognac", "Black", "Saddle"],
    featured: false,
  },
  {
    id: "8",
    name: "Linen Button-Down Shirt",
    slug: "linen-button-down-shirt",
    description: "Relaxed-fit linen shirt perfect for warm weather. Pre-washed for softness with a subtle texture. Mother-of-pearl buttons and a classic collar.",
    price: 92.00,
    images: [
      "https://picsum.photos/seed/linen1/800/1000",
      "https://picsum.photos/seed/linen2/800/1000",
    ],
    category: "Tops",
    rating: 4.6,
    reviews: 95,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Sky", "Sand", "Blush"],
    featured: false,
  },
];

export const demoReviews = [
  { author: "Alex M.", rating: 5, text: "Absolutely love the quality. Worth every penny!", date: "2 weeks ago" },
  { author: "Jordan K.", rating: 4, text: "Great fit and feel. Shipping was fast too.", date: "1 month ago" },
  { author: "Sam R.", rating: 5, text: "This is my third purchase. Consistently excellent.", date: "1 month ago" },
  { author: "Taylor P.", rating: 4, text: "Beautiful craftsmanship. Runs slightly large.", date: "2 months ago" },
  { author: "Casey L.", rating: 5, text: "Perfect gift. The packaging was gorgeous too.", date: "2 months ago" },
];
