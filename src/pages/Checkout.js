import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Checkout.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart = [], totalPrice = 0 } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("asap");
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [isPromoValid, setIsPromoValid] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState("");

  // Available promo codes
  const promoCodes = {
    "newuser": { discount: 0.10, type: "percentage", maxDiscount: null },
    "welcome50": { discount: 0.20, type: "percentage", maxDiscount: 50 },
    "freeship": { discount: 40, type: "fixed", applies: "delivery" }
  };

  // Calculate taxes (5% GST assumption)
  const taxAmount = (totalPrice * 0.05).toFixed(2);
  
  // Delivery fee
  const deliveryFee = cart.length > 0 ? 40 : 0;
  
  // Apply discount
  const effectiveDeliveryFee = 
    isPromoValid && promoCodes[promoCode.toLowerCase()]?.applies === "delivery" 
      ? 0 
      : deliveryFee;
  
  // Final amount after discounts
  const finalAmount = (
    parseFloat(totalPrice) + 
    parseFloat(taxAmount) + 
    effectiveDeliveryFee - 
    (isPromoValid && promoCodes[promoCode.toLowerCase()]?.applies !== "delivery" ? discountAmount : 0)
  ).toFixed(2);

  useEffect(() => {
    // Set estimated delivery time based on current time
    const now = new Date();
    const deliveryMinutes = 30 + Math.floor(Math.random() * 15);
    const estimatedTime = new Date(now.getTime() + deliveryMinutes * 60000);
    const timeString = estimatedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setEstimatedDeliveryTime(timeString);
  }, []);

  const applyPromoCode = () => {
    if (!promoCode) {
      setIsPromoValid(null);
      setDiscountAmount(0);
      return;
    }

    const code = promoCode.toLowerCase();
    const promoDetails = promoCodes[code];
    
    if (promoDetails) {
      setIsPromoValid(true);
      
      if (promoDetails.applies === "delivery") {
        setDiscountAmount(deliveryFee);
      } else if (promoDetails.type === "percentage") {
        const calculatedDiscount = totalPrice * promoDetails.discount;
        const finalDiscount = promoDetails.maxDiscount 
          ? Math.min(calculatedDiscount, promoDetails.maxDiscount) 
          : calculatedDiscount;
        setDiscountAmount(finalDiscount.toFixed(2));
      } else {
        setDiscountAmount(Math.min(promoDetails.discount, totalPrice).toFixed(2));
      }
    } else {
      setIsPromoValid(false);
      setDiscountAmount(0);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!deliveryAddress.trim()) {
      errors.deliveryAddress = "Delivery address is required";
    }
    
    if (!contactNumber.trim()) {
      errors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(contactNumber.replace(/\D/g, ''))) {
      errors.contactNumber = "Please enter a valid 10-digit number";
    }
    
    if (!paymentMethod) {
      errors.paymentMethod = "Please select a payment method";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(formErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Generate random order number with date prefix for uniqueness
    const datePrefix = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const randomOrderNumber = "ORD" + datePrefix + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    setOrderNumber(randomOrderNumber);
    setShowOrderConfirmation(true);

    // In a real app, API call would go here
    // For demo purposes, we'll just scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToMenu = () => {
    navigate("/menu");
  };

  if (showOrderConfirmation) {
    return (
      <motion.div 
        className="order-confirmation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="confirmation-container">
          <div className="check-icon-container">
            <div className="check-icon">✓</div>
          </div>
          <h2>Thank You for Your Order!</h2>
          <p>Your order number is: <span className="order-number">{orderNumber}</span></p>
          <p>We've sent a confirmation to your phone number.</p>
          <p className="estimated-time">Estimated delivery by {estimatedDeliveryTime}</p>
          
          <div className="order-details-summary">
            <h3>Order Summary</h3>
            <div className="summary-detail">
              <span>Total Items:</span>
              <span>{cart.length}</span>
            </div>
            <div className="summary-detail">
              <span>Delivery Address:</span>
              <span>{deliveryAddress}</span>
            </div>
            <div className="summary-detail">
              <span>Payment Method:</span>
              <span>{paymentMethod === 'cod' ? 'Cash on Delivery' : 
                     paymentMethod === 'card' ? 'Credit/Debit Card' :
                     paymentMethod === 'gpay' ? 'Google Pay' : 'PhonePe'}</span>
            </div>
            <div className="summary-detail total">
              <span>Final Amount:</span>
              <span>₹{finalAmount}</span>
            </div>
          </div>
          
          <button className="track-order-btn" onClick={() => navigate("/track-order", { state: { orderNumber } })}>
            Track Order
          </button>
          <button className="continue-shopping" onClick={backToMenu}>
            Back to Menu
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1 className="checkout-title">Checkout</h1>
        <p className="checkout-subtitle">Complete your order to satisfy your cravings</p>
      </div>

      {cart.length === 0 ? (
        <motion.div 
          className="empty-checkout"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <img src="/images/empty-cart.svg" alt="Empty Cart" className="empty-cart-icon" />
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <button className="browse-menu-btn" onClick={backToMenu}>Browse Menu</button>
        </motion.div>
      ) : (
        <div className="checkout-content">
          <div className="checkout-left">
            <motion.div 
              className="checkout-section delivery-address"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3><i className="location-icon">📍</i> Delivery Address</h3>
              <div className="form-group">
                <textarea 
                  id="deliveryAddress"
                  placeholder="Enter your complete delivery address" 
                  value={deliveryAddress}
                  onChange={(e) => {
                    setDeliveryAddress(e.target.value);
                    if (formErrors.deliveryAddress) {
                      setFormErrors({...formErrors, deliveryAddress: null});
                    }
                  }}
                  className={formErrors.deliveryAddress ? "error" : ""}
                />
                {formErrors.deliveryAddress && (
                  <div className="error-message">{formErrors.deliveryAddress}</div>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group flex-1">
                  <input 
                    id="contactNumber"
                    type="tel" 
                    placeholder="Contact Number" 
                    value={contactNumber}
                    onChange={(e) => {
                      setContactNumber(e.target.value);
                      if (formErrors.contactNumber) {
                        setFormErrors({...formErrors, contactNumber: null});
                      }
                    }}
                    className={`phone-input ${formErrors.contactNumber ? "error" : ""}`}
                  />
                  {formErrors.contactNumber && (
                    <div className="error-message">{formErrors.contactNumber}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <select 
                    value={deliveryTime} 
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="delivery-time-select"
                  >
                    <option value="asap">Deliver ASAP</option>
                    <option value="30min">In 30 minutes</option>
                    <option value="1hour">In 1 hour</option>
                    <option value="2hour">In 2 hours</option>
                  </select>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="checkout-section order-items"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3><i className="food-icon">🍲</i> Your Order ({cart.length} items)</h3>
              <div className="checkout-items">
                {cart.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="checkout-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <div className="item-image-container">
                      <img src={item.image} alt={item.name} className="checkout-item-image" />
                      <span className="item-quantity">{item.quantity}</span>
                    </div>
                    <div className="checkout-item-details">
                      <h4>{item.name}</h4>
                      <div className="item-price-info">
                        <p>₹{item.Price.toFixed(2)} × {item.quantity}</p>
                        <p className="item-total">₹{(item.Price * item.quantity).toFixed(2)}</p>
                      </div>
                      {item.customizations && (
                        <div className="item-customizations">
                          <p>{item.customizations}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="special-instructions">
                <h4>Special Instructions</h4>
                <textarea 
                  placeholder="Any special preparation instructions or food allergies we should know about?"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                ></textarea>
              </div>
            </motion.div>
          </div>

          <div className="checkout-right">
            <motion.div 
              className="checkout-section order-summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3><i className="bill-icon">🧾</i> Order Summary</h3>
              <div className="summary-row">
                <span>Item Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>GST (5%)</span>
                <span>₹{taxAmount}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span className={effectiveDeliveryFee < deliveryFee ? "strikethrough" : ""}>
                  ₹{deliveryFee.toFixed(2)}
                </span>
                {effectiveDeliveryFee < deliveryFee && (
                  <span className="discount-text">₹0.00</span>
                )}
              </div>
              {discountAmount > 0 && isPromoValid && promoCodes[promoCode.toLowerCase()]?.applies !== "delivery" && (
                <div className="summary-row discount">
                  <span>Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="summary-row promo-code">
                <div className="promo-input-container">
                  <input 
                    type="text" 
                    placeholder="Enter Promo Code"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setIsPromoValid(null);
                    }}
                    className={isPromoValid === false ? "error" : ""}
                  />
                  {isPromoValid === true && <span className="promo-valid">✓</span>}
                </div>
                <button 
                  onClick={applyPromoCode}
                  className={isPromoValid === true ? "promo-applied" : ""}
                >
                  {isPromoValid === true ? "Applied" : "Apply"}
                </button>
              </div>
              {isPromoValid === false && (
                <div className="promo-error">Invalid promo code. Please try again.</div>
              )}
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{finalAmount}</span>
              </div>
              <div className="estimated-delivery-info">
                <i className="delivery-icon">🚚</i>
                <span>Estimated delivery by {estimatedDeliveryTime}</span>
              </div>
            </motion.div>

            <motion.div 
              className="checkout-section payment-method"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              id="paymentMethod"
            >
              <h3><i className="payment-icon">💳</i> Payment Method</h3>
              <div className="payment-options">
                <div 
                  className={`payment-option ${paymentMethod === 'gpay' ? 'selected' : ''}`}
                  onClick={() => {
                    setPaymentMethod('gpay');
                    if (formErrors.paymentMethod) {
                      setFormErrors({...formErrors, paymentMethod: null});
                    }
                  }}
                >
                  <div className="payment-logo google-pay">
                    <i className="payment-icon-g">G</i> Google Pay
                  </div>
                </div>
                <div 
                  className={`payment-option ${paymentMethod === 'phonepe' ? 'selected' : ''}`}
                  onClick={() => {
                    setPaymentMethod('phonepe');
                    if (formErrors.paymentMethod) {
                      setFormErrors({...formErrors, paymentMethod: null});
                    }
                  }}
                >
                  <div className="payment-logo phonepe">
                    <i className="payment-icon-p">P</i> PhonePe
                  </div>
                </div>
                <div 
                  className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => {
                    setPaymentMethod('card');
                    if (formErrors.paymentMethod) {
                      setFormErrors({...formErrors, paymentMethod: null});
                    }
                  }}
                >
                  <div className="payment-logo card">
                    <i className="payment-icon-c">💳</i> Credit/Debit
                  </div>
                </div>
                <div 
                  className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => {
                    setPaymentMethod('cod');
                    if (formErrors.paymentMethod) {
                      setFormErrors({...formErrors, paymentMethod: null});
                    }
                  }}
                >
                  <div className="payment-logo cod">
                    <i className="payment-icon-cash">₹</i> Cash on Delivery
                  </div>
                </div>
              </div>
              {formErrors.paymentMethod && (
                <div className="error-message payment-error">{formErrors.paymentMethod}</div>
              )}
            </motion.div>

            <motion.div 
              className="place-order-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <button 
                className="place-order-btn" 
                onClick={handlePlaceOrder}
                disabled={cart.length === 0}
              >
                Place Order • ₹{finalAmount}
              </button>
              <p className="terms-text">
                By placing your order, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;