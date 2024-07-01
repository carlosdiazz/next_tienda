"use server";
import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  console.log({ orderId, transactionId });
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        transactionId,
      },
    });

    if (!order) {
      return {
        ok: false,
        message: `No se encontro una orden con el id ${orderId}`,
      };
    }

    return {
      ok: true,
      message: "Se actualizo",
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se puedo actualizar el ID de la transacion",
    };
  }
};
