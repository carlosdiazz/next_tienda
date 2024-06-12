"use server";

import prisma from "@/lib/prisma";
import { sleep } from "@/utils";

export const getStockBySlug = async (slug: string): Promise<number> => {
  await sleep(1);
  const product = await prisma.product.findFirstOrThrow({
    where: { slug },
    select: { inStock: true },
  });
  return product.inStock;
};
