export const revalidate = 10080; //7dias

import { Metadata, ResolvingMetadata } from "next";
import { getProductBySlug } from "@/actions";
import {
  AddToCart,
  ProductMobileSlideShow,
  ProductSlideShow,
  //QuantitySelector,
  //SizeSelector,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductSlugPage({ params }: Props) {
  const { slug } = params;
  //const product = initialData.products.find((product) => product.slug === slug);
  const product = await getProductBySlug(slug);

  if (!product) {
    //SI no existe lo mando para NotFound
    notFound();
  }

  return (
    //En pantallas pequena sera una COlumna en la demas 3
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* SlideShow => este va a tomar 2/3 de la pantalla */}
      <div className="col-span-1 md:col-span-2 ">
        {/* Mobile Slidesshow */}
        <ProductMobileSlideShow
          title={product!.title}
          images={product!.images}
          className="block md:hidden"
        />

        {/* Destop Slidesshow */}
        <ProductSlideShow
          title={product!.title}
          images={product!.images}
          className="hidden md:block"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5 ">
        <StockLabel slug={product!.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product!.title}
        </h1>
        <p className="text-lg mb-5">${product!.price}.00</p>

        <AddToCart product={product!}/>

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product!.description}</p>
      </div>
    </div>
  );
}
