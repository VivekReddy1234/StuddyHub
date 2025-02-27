import React, { useContext } from 'react';
import { Context } from './context-api/Cart';
import { BuyContext } from './context-api/Buy';

const Object = (props) => {
  const { addtoCart } = useContext(Context);
  const { fxn } = useContext(BuyContext);

  const handleAddToCart = () => {
    const item = { url: props.url, price: props.price, name: props.name };
    addtoCart(item);
  };

  return (
    <div className="border border-orange-200 hover:shadow-inner hover:bg-slate-300 shadow-white p-4 flex flex-col items-center justify-between h-[300px] w-[180px] overflow-hidden">
      {/* Image Container - Fixed Size */}
      <div className="flex items-center justify-center h-[150px] w-full overflow-hidden">
        <a href="/item">
          <img
            src={props.url}
            alt={props.name}
            className="max-w-full max-h-full object-contain"
          />
        </a>
      </div>

      {/* Price & Buttons */}
      <div className="flex flex-col items-center w-full gap-2 mt-2">
        <p className="text-lg font-semibold">${props.price}</p>

        <a href="/item" className="w-full">
          <button
            className="w-full px-2 py-1 bg-orange-500 rounded hover:bg-orange-700"
            onClick={() => fxn(props)}
          >
            Buy
          </button>
        </a>

        <button
          className="w-full px-2 py-1 bg-orange-500 rounded hover:bg-orange-700"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Object;

