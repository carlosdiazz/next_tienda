"use client";

import { placeOrder } from "@/actions";
import { RouterApp } from "@/config";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormart, sleep } from "@/utils";
import clsx from "clsx";
import AppRouter from "next/dist/client/components/app-router";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const address = useAddressStore((state) => state.address);
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const router = useRouter()

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceORder = async () => {
    setIsPlacingOrder(true);
    await sleep(1);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productsToOrder, address);
    console.log({ resp });
    if (!resp.ok) {
      setIsPlacingOrder(false);
      seterrorMessage(resp.message);
      return;
    }
    //* Todo salio bien!
    clearCart();
    router.replace(`${RouterApp.orders}/${resp.order!}`)
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{currencyFormart(itemsInCart)}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormart(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormart(tax)}</span>

        <span className="mt-5 text-2xl">Total: </span>
        <span className="mt-5 text-2xl text-right">$ {total}</span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al ahcer click en Pagar Orden, aceptas nuestros terminos y
            condiciones de uso
          </span>
        </p>

        <p className="text-red-500">{errorMessage}</p>
        <button
          onClick={onPlaceORder}
          disabled={isPlacingOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          //href={`${RouterApp.orders}/344`}
        >
          Pagar Orden
        </button>
      </div>
    </div>
  );
};
