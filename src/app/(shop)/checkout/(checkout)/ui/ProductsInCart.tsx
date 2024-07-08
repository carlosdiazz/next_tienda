"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";

import { currencyFormart } from "@/utils";
import { useRouter } from "next/navigation";
import { RouterApp } from "@/config";
import { ProductImage } from "@/components";

export const ProductsInCart = () => {
  const [loaded, setloaded] = useState(false);
  const router = useRouter()
  const productsInCart = useCartStore((state) => state.cart);
  const {itemsInCart, }=useCartStore(state=>state.getSummaryInformation())

  //useEffect(() => {
  //  setloaded(true);
  //}, []);

  useEffect(() => {

    if (itemsInCart === 0 && loaded === true) {
      router.replace(`${RouterApp.empty}`)
    }
    setloaded(true);
  }, [ loaded])

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            alt={product.title}
            style={{ width: "100px", height: "100px" }}
            className="mr-5 rounded"
          />
          <div>
            <span>
              {product.size} - {product.title}({product.quantity})
            </span>

            <p className="font-bold">
              {currencyFormart(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
