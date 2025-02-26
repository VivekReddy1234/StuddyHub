import React, { createContext, useState, useEffect } from 'react';

export const BuyContext = createContext(null);

export const BuyProvider = (props) => {
  const [prevImg, setImg] = useState('');
  const [prevPrice, setPrice] = useState(0);
  const [prevName, setName] = useState('');

  const [shouldNavigate, setShouldNavigate] = useState(false);

  const fxn = (item) => {
    setImg(item.url);
    setName(item.name);
    setPrice(item.price);
    setShouldNavigate(true);
  };

  useEffect(() => {
    if (shouldNavigate) {
      setShouldNavigate(false);
      window.location.href = '/item';
    }
  }, [prevImg, prevPrice, prevName, shouldNavigate]);

  return (
    <BuyContext.Provider value={{ fxn, prevImg, prevName, prevPrice }}>
      {props.children}
    </BuyContext.Provider>
  );
};
