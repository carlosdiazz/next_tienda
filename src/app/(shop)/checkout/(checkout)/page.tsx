import Link from "next/link";
import { Title } from "@/components";
import { RouterApp } from "@/config";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";


export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Verificar Orden" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <h1>Ajustar Carrito</h1>
            <Link href={RouterApp.cart} className="underline mb-5">
              Editar carrito
            </Link>

            {/* Items */}
            <ProductsInCart/>
          </div>

          {/* Checkout - Resumen de Orden*/}
          <PlaceOrder/>
        </div>
      </div>
    </div>
  );
}
