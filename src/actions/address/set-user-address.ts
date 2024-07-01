"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddres(address, userId);
    return {
      ok: true,
      address: newAddress,
    };
  } catch (e) {
    console.log(`Error => ${e}`);
    return {
      ok: false,
      message: "No se pudo grabar",
    };
  }
};

const createOrReplaceAddres = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      city: address.city,
    };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: addressToSave,
    });
    return updatedAddress;
  } catch (e) {
    throw new Error(`Error creando o actualizando la direccion`);
  }
};
