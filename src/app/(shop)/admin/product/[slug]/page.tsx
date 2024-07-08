import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { RouterApp } from "@/config";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  //TODO: new
  if (!product && slug !=='new') {
    redirect(`${RouterApp.adminProducts}`);
  }

  const title = slug === "new" ? "Nuevo Productor" : "Editar Producto";

  return (
    <>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
