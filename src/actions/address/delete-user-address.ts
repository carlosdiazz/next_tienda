"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddres = async (userId: string) => {
  try {
    await prisma.userAddress.delete({
      where: { userId },
    });
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      message: "No se pudo eliminar la direccion",
    };
  }
};
