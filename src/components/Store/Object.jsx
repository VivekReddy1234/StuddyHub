import React, { useContext } from 'react';
import './Object.css';
import { Context } from './context-api/Cart';
import { BuyContext } from './context-api/Buy';

const Object = (props) => {
  const { addtoCart } = useContext(Context);
  const { fxn } = useContext(BuyContext);

  const handleAddToCart = () => {
    const item = { url: props.url, price: props.price, name: props.name };
    addtoCart(item);
  };

  // const handleBuy = (e) => {
  //   e.preventDefault();
  //   const item = { url: props.url, price: props.price, name: props.name };
  //   fxn(item);
  // };

  return (
    <div id='object'>
      <div id='imgStore'>
        <a href="/item">
          <img src={props.url} alt={props.name} id='object-img' height={props.height} width={props.width}/>
        </a>
      </div>
      <div id='buy-box'>
        <p className="price">${props.price}</p>
        <a href="/item">
          <button className='buy' onClick={()=>fxn(props)}>Buy</button>
        </a>
        <button className='buy' onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Object;
