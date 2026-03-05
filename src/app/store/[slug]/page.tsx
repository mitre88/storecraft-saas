import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MinimalistStore } from "@/components/storefront/minimalist";
import { BoldStore } from "@/components/storefront/bold";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params;
  const store = await prisma.store.findUnique({
    where: { slug },
    include: { products: { where: { active: true }, orderBy: { createdAt: "desc" } } },
  });

  if (!store || !store.active) return notFound();

  const storeData = {
    name: store.name,
    slug: store.slug,
    description: store.description,
    logo: store.logo,
    primaryColor: store.primaryColor,
    secondaryColor: store.secondaryColor,
    accentColor: store.accentColor,
    products: store.products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      compareAt: p.compareAt,
      images: p.images,
      category: p.category,
      featured: p.featured,
    })),
  };

  if (store.template === "bold") {
    return <BoldStore store={storeData} />;
  }

  return <MinimalistStore store={storeData} />;
}
