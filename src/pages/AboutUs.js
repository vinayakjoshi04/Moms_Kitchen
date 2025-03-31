import React from "react";
import "../pages/AboutUs.css";
import Footer from "../components/Footer";
import deliveryIcon from "../assets/delivery.png";
import deliciousIcon from "../assets/delicious.png";
import hygieneIcon from "../assets/hygiene.png";
import affordableIcon from "../assets/affordable.png";
import hotelIcon from "../assets/hotel.png";
import ingredientsIcon from "../assets/ingredients.png";
import sustainabilityIcon from "../assets/sustainability.png";
import supportIcon from "../assets/support.png";
import customizeIcon from "../assets/customize.png";

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">Welcome to Mom's Kitchen</h1>
        <p className="about-subtitle">
          Experience the taste of <strong>homemade flavors</strong>, prepared with love.
          <br />
          <strong>Fresh, Delicious, and Delivered to Your Doorstep!</strong>
        </p>
      </div>

      <div className="features-container">
        {/* Hotel Tie-Ups */}
        <div className="feature-row">
          <div className="feature-icon-container">
            <img src={hotelIcon} alt="Hotel Partnerships" className="feature-icon" />
          </div>
          <div className="feature-text">
            <h2>Partnered with Top Hotels</h2>
            <p>We collaborate with renowned hotels & restaurants to bring you exclusive gourmet dishes prepared by expert chefs.</p>
            <a href="#partnerships" className="feature-cta">Learn More</a>
          </div>
        </div>

        {/* Customized Orders */}
        <div className="feature-row reverse">
          <div className="feature-icon-container">
            <img src={customizeIcon} alt="Custom Orders" className="feature-icon" />
          </div>
          <div className="feature-text">
            <h2>Customizable Meal Plans</h2>
            <p>We offer personalized meals based on your dietary needs & preferences, ensuring a dining experience tailored just for you.</p>
            <a href="#customize" className="feature-cta">Customize Now</a>
          </div>
        </div>

        {/* Fast Delivery */}
        <div className="feature-row">
          <div className="feature-icon-container">
            <img src={deliveryIcon} alt="Fast Delivery" className="feature-icon" />
          </div>
          <div className="feature-text">
            <h2>Lightning-Fast Delivery</h2>
            <p>Our efficient delivery network ensures your food <strong>arrives hot & fresh</strong> in record time, maintaining quality from our kitchen to your table.</p>
            <a href="#delivery" className="feature-cta">Check Coverage</a>
          </div>
        </div>

        {/* Delicious & Homemade */}
        <div className="feature-row reverse">
          <div className="feature-icon-container">
            <img src={deliciousIcon} alt="Delicious Food" className="feature-icon" />
          </div>
          <div className="feature-text">
            <h2>Authentic Homemade Taste</h2>
            <p>Prepared with <strong>time-honored recipes</strong> to deliver genuine homemade flavors that comfort and delight with every bite.</p>
            <a href="#menu" className="feature-cta">View Menu</a>
          </div>
        </div>

        {/* Hygiene */}
        <div className="feature-row">
          <div className="feature-icon-container">
            <img src={hygieneIcon} alt="Hygiene" className="feature-icon" />
          </div>
          <div className="feature-text">
            <h2>Industry-Leading Hygiene</h2>
            <p>We maintain <strong>strict food safety protocols</strong> with professionally cleaned and sanitized kitchens that exceed industry standards.</p>
            <a href="#hygiene" className="feature-cta">Our Standards</a>
          </div>
        </div>

        {/* Budget-Friendly */}
        <div className="feature-row reverse">
          <div className="feature-icon-container">
            <img src={affordableIcon} alt="Affordable Prices" className="feature-icon" />
          </div>
          <div className="feature-text">
            <h2>Value-Driven Pricing</h2>
            <p>Enjoy premium quality cuisine without premium prices. Our efficient operations allow us to offer exceptional value without compromising quality.</p>
            <a href="#pricing" className="feature-cta">View Pricing</a>
          </div>
        </div>
        
        {/* Fresh Ingredients */}
        <div className="feature-row">
          <div className="feature-icon-container">
            <img src={ingredientsIcon} alt="Fresh Ingredients" className="feature-icon" />
          </div>
          <div className="feature-text">
            <h2>Farm-Fresh Ingredients</h2>
            <p>We source organic, locally grown ingredients to ensure unmatched taste, nutritional value, and support for local farmers.</p>
            <a href="#ingredients" className="feature-cta">Our Sources</a>
          </div>
        </div>

        {/* Sustainability */}
        <div className="feature-row reverse">
          <div className="feature-icon-container">
            <img src={sustainabilityIcon} alt="Sustainability" className="feature-icon" />
          </div>
          <div className="feature-text">
            <h2>Environmental Stewardship</h2>
            <p>Committed to sustainable practices through biodegradable packaging, food waste minimization, and environmentally conscious operations.</p>
            <a href="#sustainability" className="feature-cta">Our Impact</a>
          </div>
        </div>

        {/* Customer Support */}
        <div className="feature-row">
          <div className="feature-icon-container">
            <img src={supportIcon} alt="Customer Support" className="feature-icon" />
          </div>
          <div className="feature-text">
            <h2>24/7 Dedicated Support</h2>
            <p>Our professional support team is available round-the-clock to address your inquiries and ensure complete satisfaction with every order.</p>
            <a href="#support" className="feature-cta">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;