import { notFound } from "next/navigation";
import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { Category } from "@/interfaces";

interface Props {
  params: {
    id: Category;
  };
}
const products = initialData.products;

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  if (id !== "men" && id !== "women" && id !== "kid") {
    notFound();
  }

  const labels = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
  };

  const newProducts = products.filter((product) => product.gender === id);

  return (
    <>
      <Title
        title={id}
        subtitle={`Articulos de ${labels[id]}`}
        className="mb-2 capitalize"
      />
      <ProductGrid products={newProducts} />
    </>
  );
}
