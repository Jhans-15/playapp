import React, { createContext, useReducer, useContext } from 'react';

// Acciones del carrito
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_TOTAL = 'UPDATE_TOTAL';

// Función reductora del carrito
// Función reductora del carrito
const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload],
                total: state.total + parseFloat(action.payload.price) * action.payload.quantity,
            };

        case UPDATE_ITEM:
            const updatedItems = state.items.map(item =>
                item.id === action.payload.id ? action.payload : item
            );
            return {
                ...state,
                items: updatedItems,
                total: state.total + parseFloat(action.payload.price) * action.payload.quantity,
            };

        case REMOVE_ITEM:
            const removedItem = state.items.find(item => item.id === action.payload.id);
            const filteredItems = state.items.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                items: filteredItems,
                total: state.total - parseFloat(removedItem.price) * removedItem.quantity,
            };

        case UPDATE_TOTAL:
            const newTotal = action.payload !== undefined ? action.payload : state.items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
            return {
                ...state,
                total: newTotal,
            };

        default:
            return state;
    }
};


// Contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

    const addItem = (item) => {
        dispatch({ type: ADD_ITEM, payload: item });
        dispatch({ type: UPDATE_TOTAL });
    };

    const updateItem = (item) => {
        dispatch({ type: UPDATE_ITEM, payload: item });
        dispatch({ type: UPDATE_TOTAL });
    };

    const removeItem = (item) => {
        dispatch({ type: REMOVE_ITEM, payload: item });
        dispatch({ type: UPDATE_TOTAL });
    };

    const updateTotal = (customPrice) => {
        dispatch({ type: UPDATE_TOTAL, payload: customPrice });
    };

    const contextValue = {
        cart: cartState,
        addItem,
        updateItem,
        removeItem,
        updateTotal
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

// Función de utilidad para usar el contexto del carrito
export const useCart = () => {
    return useContext(CartContext);
};