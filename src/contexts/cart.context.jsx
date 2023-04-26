import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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
    cartCount: 0,
    cartTotal: 0
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}   

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch(type) {
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }

    }
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {cartItems, isCartOpen, cartCount, cartTotal} = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems, 
                cartTotal: newCartTotal, 
                cartCount: newCartCount
            })            
        );

    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(productToAdd, cartItems);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToAdd) => {
        const newCartItems = removeCartItem(productToAdd, cartItems);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (productToAdd) => {
        const newCartItems = clearCartItem(productToAdd, cartItems);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartCount, cartTotal};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

// export const CartProvider = ({children}) => {
//     const [isCartOpen, setIsCartOpen] = useState(false);
//     const [cartItems, setCartItems] = useState([]);
//     const [cartCount, setCartCount] = useState(0);
//     const [cartTotal, setCartTotal] = useState(0);

//     useEffect(() => {
//         const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
//         setCartCount(newCartCount);
//     }, [cartItems]);

//     useEffect(() => {
//         const newCartTotal = cartItems.reduce(
//             (total, cartItem) => total + cartItem.quantity * cartItem.price,
//             0
//           );
//           setCartTotal(newCartTotal);
//     }, [cartItems]);

//     const addItemToCart = (productToAdd) => {
//         setCartItems(addCartItem(productToAdd, cartItems)); 
//     }

//     const removeItemFromCart = (productToAdd) => {
//         setCartItems(removeCartItem(productToAdd, cartItems));
//     }

//     const clearItemFromCart = (productToAdd) => {
//         setCartItems(clearCartItem(productToAdd, cartItems));
//     }

//     const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartCount, cartTotal};
//     return (
//         <CartContext.Provider value={value}>{children}</CartContext.Provider>
//     )
// }