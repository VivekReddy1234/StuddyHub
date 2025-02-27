import React, { createContext, useState } from 'react';

export const Context = createContext(null);

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  const addtoCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <Context.Provider value={{ cart, addtoCart }}>
      {props.children}
    </Context.Provider>
  );
};
