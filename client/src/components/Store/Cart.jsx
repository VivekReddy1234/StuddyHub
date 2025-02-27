import React from 'react';
import { useContext } from 'react';
import { Context } from './context-api/Cart';

const Cart = () => {
  const context = useContext(Context);

  console.log(context.prevPrice)
  return (
    <>
    
      {/* <ul>
        {prevImg.map((url, idx) => (
          <li key={idx}>
            <img src={url} alt="" />
          </li>
        ))}
      </ul> */}
      <p>Total price is ${context.prevPrice}</p>
    </>
  );
};

export default Cart;
