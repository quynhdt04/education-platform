import { combineReducers } from "redux";
import { priceFilterReducer } from "./priceFilter";
import { cartReducer } from "./cart.reducer";

export const allReducers = combineReducers({
    priceFilterReducer,
    cartReducer
});