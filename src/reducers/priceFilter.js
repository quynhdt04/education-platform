export const priceFilterReducer = (state = [], action) => {

  switch (action.type) {
    case "SET_PRICE_FILTER":
      return action.payload; 
    default:
      return state;
  }
}