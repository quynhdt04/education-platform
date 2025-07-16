export const addToCart = (product) => {
    return {
        type: "ADD_TO_CART",
        product: product
    };
};

export const increaseQuantity = (productId) => {
    return {
        type: "INCREASE_QUANTITY",
        product: productId
    };
};

export const decreaseQuantity = (productId) => {
    return {
        type: "DECREASE_QUANTITY",
        product: productId
    };
};

export const deleteProduct = (productId) => {
    return {
        type: "REMOVE_FROM_CART",
        product: productId
    };
};