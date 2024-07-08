"use server";

import { RouterApp } from "@/config";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      message: "No se puede eliminar archivo locales",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.productImage.delete({
      where: { id: imageId },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    //Revaldiar los paths
    revalidatePath(`${RouterApp.adminProducts}`);
    revalidatePath(`${RouterApp.adminProduct}/${deletedImage.product.slug}`);
    revalidatePath(`${RouterApp.product}/${deletedImage.product.slug}`);

    return {
      ok: true,
      message: "Se elimino la imagen",
    };

    //TODO revaldiar los paths
  } catch (e) {
    return {
      ok: false,
      message: "No se puede elimininar la imagen",
    };
  }
};
