import { get } from "../utils/request";

export const getProducts = async () => {
  const result = await get('products');
  return result;
};

export const getProductItem = async (id) => {
  const result = await get(`products/${id}`);
  return result;
};