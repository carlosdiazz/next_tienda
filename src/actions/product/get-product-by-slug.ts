"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirstOrThrow({
      include: {
        ProductImage: {
          select: {
            url: true,
            id: true,
          },
        },
      },
      where: {
        slug,
      },
    });

    //const { ProductImage, ...rest } = product;
    console.log(`ACA => ${JSON.stringify(product)}`);
    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    throw new Error("Error al obtener productos por slug");
  }
};
