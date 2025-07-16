const initialState = {
    items: JSON.parse(localStorage.getItem("cart")) || []
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const product = action.product;
            const existingIndex = state.items.findIndex(item => item.id === product.id);
            let newItems;

            if (existingIndex !== -1) {
                newItems = state.items.map((item, index) =>
                    index === existingIndex ?
                    {
                        ...item,
                        quantity: item.quantity + 1
                    } :
                    item
                );
            } else {
                newItems = [...state.items, {
                    ...product,
                    quantity: 1
                }];
            }

            localStorage.setItem("cart", JSON.stringify(newItems));

            return {
                ...state,
                items: newItems
            };
        }
        case "INCREASE_QUANTITY": {
            const productId = action.product;
            const newItems = state.items.map(item => {
                if (item.id === productId) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };
                }
                return item;
            });

            localStorage.setItem("cart", JSON.stringify(newItems));
            return {
                ...state,
                items: newItems
            };
        }
        case "DECREASE_QUANTITY": {
            const productId = action.product;
            const newItems = state.items.map(item => {
                if (item.id === productId) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };
                }
                return item;
            });

            localStorage.setItem("cart", JSON.stringify(newItems));
            return {
                ...state,
                items: newItems
            };
        }
        case "REMOVE_FROM_CART": {
            const productId = action.product;
            const newItems = state.items.filter(item => item.id !== productId);

            localStorage.setItem("cart", JSON.stringify(newItems));
            return {
                ...state,
                items: newItems
            };
        }

        default:
            return state;
    }
};