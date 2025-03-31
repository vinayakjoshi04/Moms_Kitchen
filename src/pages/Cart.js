import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const increaseQuantity = (name) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (name) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === name ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (name) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== name));
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const subtotal = cart.reduce((acc, item) => acc + item.Price * item.quantity, 0);
  const tax = subtotal * 0.18; // Assuming 18% GST
  const totalPrice = subtotal + tax;

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <button 
            className="continue-shopping-btn" 
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-image-container">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </div>
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">₹{item.Price.toFixed(2)}</p>
                  <div className="cart-item-actions">
                    <div className="cart-controls">
                      <button 
                        className="cart-quantity-btn" 
                        onClick={() => decreaseQuantity(item.name)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="cart-quantity-display">{item.quantity}</span>
                      <button 
                        className="cart-quantity-btn" 
                        onClick={() => increaseQuantity(item.name)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <p className="item-subtotal">
                      Subtotal: ₹{calculateSubtotal(item.Price, item.quantity).toFixed(2)}
                    </p>
                    <button 
                      className="remove-item-btn" 
                      onClick={() => removeFromCart(item.name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span className="summary-label">Subtotal:</span>
              <span className="summary-value">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Tax (18% GST):</span>
              <span className="summary-value">₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span className="summary-label">Total:</span>
              <span className="summary-value total-value">₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="cart-actions">
              <button 
                className="continue-shopping-btn" 
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
              <button 
                className="checkout-btn" 
                onClick={() => navigate("/checkout", { state: { cart, totalPrice } })}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;