import Image from "next/image";
import Link from "next/link";
import { Title } from "@/components";
import { RouterApp } from "@/config";
import { initialData } from "@/seed/seed";


const productsInCart = [initialData.products[0], initialData.products[2]];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Verificar Orden" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <Link href={RouterApp.cart} className="underline mb-5">
              Editar carrito
            </Link>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  style={{ width: "100px", height: "100px" }}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price}.00 x 3</p>
                  <p className="font-bold">Subtotal: ${product.price}.00</p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de Orden*/}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Carlos Diaz</p>
              <p>La Vega, Las carolinas</p>
              <p>Republica Dominicana</p>
              <p>809-555-5555</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100.00</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 15.00</span>

              <span className="mt-5 text-2xl">Total: </span>
              <span className="mt-5 text-2xl text-right">$ 15.00</span>
            </div>
            <div className="mt-5 mb-2 w-full">

              <p className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs">
                  Al ahcer click en Pagar Orden, aceptas nuestros terminos y condiciones de uso
                </span>
              </p>

              <Link
                className="flex btn-primary justify-center"
                href={`${RouterApp.orders}/344`}
              >
                Pagar Orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
