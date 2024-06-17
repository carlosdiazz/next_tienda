"use client";

import { RouterApp } from "@/config";
import { useCartStore } from "@/store";
import { currencyFormart } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const router = useRouter()
  const [loaded, setloaded] = useState(false);
  const {itemsInCart, subTotal, tax, total}=useCartStore(state=>state.getSummaryInformation())

  useEffect(() => {
    setloaded(true);
  }, []);

  useEffect(() => {
    if (itemsInCart === 0 && loaded === true) {
      router.replace(`${RouterApp.empty}`)
    }
  }, [itemsInCart, loaded])


  if(!loaded) return <p>Cargando...</p>

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{ currencyFormart(itemsInCart)}</span>

      <span>Subtotal</span>
      <span className="text-right">{ currencyFormart(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{ currencyFormart(tax)}</span>

      <span className="mt-5 text-2xl">Total: </span>
      <span className="mt-5 text-2xl text-right">$ {total}</span>
    </div>
  );
};
