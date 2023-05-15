import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";

const addCartItem = (productToAdd: CategoryItem, cartItems: CartItem[]): CartItem[] => {
    const existingItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    if(existingItem) {
        return cartItems.map(cartItem => (cartItem.id === productToAdd.id) ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (productToAdd: CartItem, cartItems: CartItem[]) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    if (existingItem && existingItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToAdd.id);
    }
    return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    )
}

const clearCartItem = (productToAdd: CartItem, cartItems: CartItem[]): CartItem[] => {
    return cartItems.filter(cartItem => cartItem.id !== productToAdd.id);
}

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);    
})

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
})

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(productToAdd, cartItems);
    return setCartItems(newCartItems);
}

export const removeItemFromCart = (cartItems: CartItem[], productToAdd: CartItem) => {
    const newCartItems = removeCartItem(productToAdd, cartItems);
    return setCartItems(newCartItems);
}

export const clearItemFromCart = (cartItems: CartItem[], productToAdd: CartItem) => {
    const newCartItems = clearCartItem(productToAdd, cartItems);
    return setCartItems(newCartItems);
}