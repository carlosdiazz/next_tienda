import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updateCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );
        set({ cart: updateCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });

        set({ cart: updateCartProducts });
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        console.log(cart);

        //1.Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );
        if (!productInCart) {
          //Agrego el carrito, y esto se encarga de notificar a todos
          set({ cart: [...cart, product] });
          return;
        }

        //2. Se que el producto existe por talla tengo que incrementar
        const updateCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updateCartProduct });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
