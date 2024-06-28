export { getPaginatedProductsWithImages } from "./product/product-pagination";
export { getStockBySlug } from "./product/get-stock-by-slug";
export { getProductBySlug } from "./product/get-product-by-slug";

export { authenticate, login } from "./auth/login";
export { logout } from "./auth/logout";
export { registerUser } from "./auth/register";

export { getCountries } from "./country/get-countries";

export { setUserAddress } from "./address/set-user-address";
export { deleteUserAddres } from "./address/delete-user-address";
export { getUserAddress } from "./address/get-user-address";

export { placeOrder } from "./order/place-order";
export { getOrderById } from "./order/get-order-by-id";
export { getOrdersByUser } from "./order/get-orders-by-user";
