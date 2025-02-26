import React, { useContext, useEffect } from 'react';
import { BuyContext } from './context-api/Buy';
import './Item.css';

const Item = () => {
  const { prevImg, prevPrice, prevName } = useContext(BuyContext);
console.log(prevPrice)

  return (
    <>
      <div id="left-item">
        <div id="item-container">
          <img src={prevImg} alt={prevName} id="item" />
          <div id="item-detail">
            <div id="item-Price">M.R.P: ${prevPrice}</div>
            <div id="item-ISBN">ISBN:NFG1325353</div>
          </div>
        </div>
      </div>
      <div id="right-item"></div>
    </>
  );
};

export default Item;
