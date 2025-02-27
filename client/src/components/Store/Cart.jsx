import React from 'react';
    import { Link } from 'react-router-dom';
import { useCartContext } from './context-api/Cart';
    

    function Cart({ removeFromCart, updateQuantity }) {
      const {cart} = useCartContext();
      console.log(cart);

      const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    console.log(Cart);
      return (
        <div>
          <h2>Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <p>{item.name}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                      />
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))}
              <div className="cart-summary">
                <p>Total: ${totalPrice.toFixed(2)}</p>
                <Link to="/buy">
                  <button>Buy Now</button>
                </Link>
              </div>
            </>
          )}
        </div>
      );
    }

    export default Cart;
