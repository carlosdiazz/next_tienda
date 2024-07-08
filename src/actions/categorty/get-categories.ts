"use server";

import prisma from "@/lib/prisma";

export const getCategories = async () => {
  try {
    return await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
  } catch (e) {
    console.log(e);
    return [];
  }
};
