import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if the same product with same size already exists in cart
      const existingItemIndex = state.items.findIndex(
        item => 
          item.product.id === action.payload.product.id && 
          item.selectedSize.label === action.payload.selectedSize.label
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        updatedItems[existingItemIndex].totalPrice = (
          parseFloat(updatedItems[existingItemIndex].product.price.replace('$', '')) * 
          updatedItems[existingItemIndex].selectedSize.multiplier * 
          updatedItems[existingItemIndex].quantity
        ).toFixed(2);
        
        return { ...state, items: updatedItems };
      } else {
        // Add new item to cart
        return { ...state, items: [...state.items, action.payload] };
      }
      
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload)
      };
      
    case 'CLEAR_CART':
      return { ...state, items: [] };
      
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product, selectedSize, quantity) => {
    const basePrice = parseFloat(product.price.replace('$', ''));
    const totalPrice = (basePrice * selectedSize.multiplier * quantity).toFixed(2);
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        selectedSize,
        quantity,
        totalPrice
      }
    });
  };

  const removeFromCart = (index) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: index
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cartItems: cartState.items,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};