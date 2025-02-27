import React from 'react';

    function Buy({ cart }) {
      const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return (
        <div className="buy-page">
          <h2>Checkout</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <p>Items in your cart:</p>
              <ul>
                {cart.map(item => (
                  <li key={item.id}>
                    {item.name} x {item.quantity} - ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p>Total: ${totalPrice.toFixed(2)}</p>
              <button>Confirm Purchase</button>
            </>
          )}
        </div>
      );
    }

    export default Buy;
