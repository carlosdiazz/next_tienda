"use server";

import { auth } from "@/auth";
import { RouterApp } from "@/config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe se estar autenticado",
    };
  }
  try {
    const newRole = role === "admin" ? "admin" : "user";

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });
    revalidatePath(`${RouterApp.adminUsers}`);
    return {
      ok: false,
      message: "Se actualizo el rol",
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: "No se pudo actualizar el role",
    };
  }
};
