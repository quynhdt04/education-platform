export const priceFilter = (payload) => {
    return {
        type: "SET_PRICE_FILTER",
        payload: payload
    };
}