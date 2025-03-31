import React from "react";
import { FaInstagram, FaFacebookF, FaPinterestP, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";
import googlePlay from "../assets/google.jpg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="brand-name">Mom's Kitchen</h2>
            <p className="brand-slogan">Homemade Goodness, Delivered</p>
            <div className="social-icons">
              <div className="icon-circle"><FaLinkedinIn /></div>
              <div className="icon-circle"><FaInstagram /></div>
              <div className="icon-circle"><FaFacebookF /></div>
              <div className="icon-circle"><FaPinterestP /></div>
              <div className="icon-circle"><FaTwitter /></div>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Our Team</a></li>
                <li><a href="#">Franchise</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h4>Contact Us</h4>
              <ul>
                <li><a href="#">Help & Support</a></li>
                <li><a href="#">Partner With Us</a></li>
                <li><a href="#">Order Tracking</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h4>Available In</h4>
              <ul>
                <li><a href="#">Mumbai</a></li>
                <li><a href="#">Delhi</a></li>
                <li><a href="#">Bangalore</a></li>
                <li><a href="#">Pune</a></li>
                <li><a href="#">Hyderabad</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Refund Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="app-section">
          <div className="app-content">
            <h3>Get the Mom's Kitchen App</h3>
            <p>Order your favorite homemade dishes, track delivery in real-time, and enjoy exclusive app-only offers</p>
            <div className="download-buttons">
              <img src={googlePlay} alt="Google Play" />
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" />
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 Mom's Kitchen Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;