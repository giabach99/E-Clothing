import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (productToAdd, cartItems) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    if(existingItem) {
        return cartItems.map(cartItem => (cartItem.id === productToAdd.id) ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (productToAdd, cartItems) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    if (existingItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToAdd.id);
    }
    return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    )
}

const clearCartItem = (productToAdd, cartItems) => {
    return cartItems.filter(cartItem => cartItem.id !== productToAdd.id);
}

export const setIsCartOpen = (boolean) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);    
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(productToAdd, cartItems);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, productToAdd) => {
    const newCartItems = removeCartItem(productToAdd, cartItems);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, productToAdd) => {
    const newCartItems = clearCartItem(productToAdd, cartItems);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}