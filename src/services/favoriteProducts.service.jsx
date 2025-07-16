import { get, patch, post } from "../utils/request";

export const getFavoriteProducts = async () => {
  const result = await get('favoriteProducts');
  return result;
};

export const getFavoriteProductsByUser = async (userId) => {
  const result = await get(`favoriteProducts?userId=${userId}`);
  return result[0]; 
};

export const postFavoriteProduct = async (data) => {
    const result = await post('favoriteProducts', data);
    return result;
}

export const updateFavoriteProducts = async (userId, data) => {
  const result = await patch('favoriteProducts', userId, data);
  return result;
}