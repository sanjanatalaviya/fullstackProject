import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    cart: [],
    error: null
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log(action);
            // state.cart.push({ pid: action.payload, qty: 1 })
            // const itemindex = state.cart.findIndex((item) => item.id === action.payload.id);
            // if (itemindex >= 0) {
            //     state.cart[itemindex].quantity += 1;
            // } else {
            //     const tempProducte = { ...action.payload, qty: 1 };
            //     state.cart.push(tempProducte);
            // }
            const itemindex = state.cart.findIndex((v) => v.pid === action.payload.id);
            console.log(itemindex);
            if (itemindex !== -1) {
                state.cart[itemindex].qty += action.payload.count;
            } else {
                state.cart.push({ pid: action.payload.id, qty: action.payload.count })
            }
        },
        deleteCart: (state, action) => {
            console.log(action.payload);
            const itemindex = state.cart.findIndex((v) => v.pid === action.payload);
            if (itemindex !== -1) {
                state.cart.splice(itemindex, 1);
                // state.cart.filter((v) => v.pid !== action.payload)
                // state.cart = action.payload
            }
        },
        incerementCart: (state, action) => {
            console.log(action.payload);
            const itemindex = state.cart.findIndex((v) => v.pid === action.payload);
            if (itemindex !== -1) {
                state.cart[itemindex].qty++;
            }
        },
        decerementCart: (state, action) => {
            console.log(action.payload);
            const itemindex = state.cart.findIndex((v) => v.pid === action.payload);
            if (state.cart[itemindex].qty > 1) {
                state.cart[itemindex].qty--;
            }
        }
    }
});

export const { addToCart, incerementCart, deleteCart, decerementCart } = cartSlice.actions;
export default cartSlice.reducer;