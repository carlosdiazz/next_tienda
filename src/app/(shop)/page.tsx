import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { RouterApp } from "@/config";
import { redirect } from "next/navigation";
//import { initialData } from "@/seed/seed";
//const products = initialData.products;

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect(RouterApp.home);
  }

  return (
    <>
      <Title title="Tienda" subtitle="Todos los Productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPage={totalPages}/>
    </>
  );
}
//{<ProductGrid products={products} />}
