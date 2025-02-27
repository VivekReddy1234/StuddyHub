import React, { useContext } from 'react';
import { BuyContext } from './context-api/Buy';

const Item = () => {
  const { prevImg, prevPrice, prevName } = useContext(BuyContext);

  return (
    <div className="flex flex-col md:flex-row items-start p-10">
      {/* Left Item */}
      <div className="w-full md:w-2/5 flex flex-col">
        <div className="pl-10 pt-12">
          <img
            src={prevImg}
            alt={prevName}
            className="bg-black w-[400px] h-[500px] object-cover"
          />
          <div className="text-lg mt-4">
            <div className="font-semibold">M.R.P: ${prevPrice}</div>
            <div className="text-gray-600">ISBN: NFG1325353</div>
          </div>
        </div>
      </div>

      {/* Right Item */}
      <div className="flex-1"></div>
    </div>
  );
};

export default Item;
