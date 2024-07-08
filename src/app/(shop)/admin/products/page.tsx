export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, Title } from "@/components";
import { RouterApp } from "@/config";
import { currencyFormart } from "@/utils";
import Image from "next/image";
import Link from "next/link";


interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsAdminPages({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  return (
    <>
      <Title title="Mantenimeinto de productos" />

      <div className="flex justify-end mb-5">
        <Link href={""} className="btn-primary">
          Nuevo Producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Genero
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Tallas
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                key={product.id}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`${RouterApp.product}/${product.slug}`}>
                    <Image
                      src={`/products/${product.ProductImage[0].url}`}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`${RouterApp.adminProduct}/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className=" text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {currencyFormart(product.price)}
                </td>
                <td className=" text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.gender}
                </td>

                <td className=" text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>

                <td className=" text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.sizes.join(",")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalPage={totalPages} />
    </>
  );
}
