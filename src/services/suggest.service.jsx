import { get } from "../utils/request";

export const getProducListSuggest = async (userId) => {
  const result = await get(`suggestions?userId=${userId}`);
  return result[0];
};