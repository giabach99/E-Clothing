import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart : () => {},
    clearItemFromCart: () => {},
    cartCount: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(productToAdd, cartItems)); 
    }

    const removeItemFromCart = (productToAdd) => {
        setCartItems(removeCartItem(productToAdd, cartItems));
    }

    const clearItemFromCart = (productToAdd) => {
        setCartItems(clearCartItem(productToAdd, cartItems));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartCount};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}