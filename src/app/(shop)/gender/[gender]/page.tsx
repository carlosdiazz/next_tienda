export const revalidate = 60; // Se actialixara cada 60 segunfos

import { notFound, redirect } from "next/navigation";
import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { RouterApp } from "@/config";

interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string;
  }
}
//const products = initialData.products;

export default async function GenderPage({ params, searchParams }: Props) {
  const labels = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
  };

  const { gender } = params;

  if (gender !== "men" && gender !== "women" && gender !== "kid") {
    notFound();
  }

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender });

  if (products.length === 0) {
    redirect(`${RouterApp.gender}/${gender}`);
  }

  return (
    <>
      <Title
        title={gender}
        subtitle={`Articulos de ${labels[gender]}`}
        className="mb-2 capitalize"
      />
      <ProductGrid products={products} />
    <Pagination totalPage={totalPages}/>
    </>
  );
}
