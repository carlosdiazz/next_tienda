"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getPaginatedUsers = async () => {
  const sesion = await auth();

  if (sesion?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe ser un usuario Adminsitrador",
    };
  }

  const users = await prisma.user.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return {
    ok: true,
    users,
  };
};
