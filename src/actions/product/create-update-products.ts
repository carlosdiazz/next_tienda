"use server";

import { RouterApp } from "@/config";
import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string().min(3),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return { ok: false, message: "Error con los datos" };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        //Actualizar
        product = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: tagsArray,
          },
        });
      } else {
        product = await tx.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: tagsArray,
          },
        });
      }

      //Proceso de cargar y guardado de Imagenes
      //Recorrer las imagenes y guardarlas
      if (formData.getAll("images")) {
        // [ https://images.logo1.jpg, https://images.logo2.jpg, ]
        const images = await uploadImages(formData.getAll("images") as File[]);
        if (!images) {
          throw new Error("No se pudo cargar las imagenes");
        }
        await tx.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }

      return {
        product,
      };
    });

    //TODO Revalidar Paths
    revalidatePath(`${RouterApp.adminProducts}`);
    revalidatePath(`${RouterApp.adminProduct}/${product.slug}`);
    revalidatePath(`${RouterApp.product}/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
      message: "No se pudo actualizar",
    };
  } catch (e) {
    return {
      ok: false,
      message: "No se pudo actualizar",
    };
  }
};

//
const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (e) {
        console.log(e);
        return null;
      }
    });

    const uploadImages = await Promise.all(uploadPromises);
    return uploadImages;
  } catch (e) {
    console.log(e);
    return null;
  }
};
