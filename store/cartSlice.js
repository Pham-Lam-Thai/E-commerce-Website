import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cartItems: []
};
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state, action){
            console.log('addToCart', state)
            state.cartItems.push(action.payload);
        },
        updateCart(state, action){
            state.cartItems = action.payload;
            console.log('updateCart', state)
        },
        emptyCart(state, action){
            state.cartItems = [];
        },
    },
});
export const {addToCart, updateCart, emptyCart} = cartSlice.actions;
export default cartSlice.reducer;