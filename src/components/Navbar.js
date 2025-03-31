import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, ShoppingCart } from "lucide-react"; // Assuming lucide-react is installed
import Login from "../pages/Login";
import "./Navbar.css";

function Navbar() {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef(null);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage) return;
      
      const scrollPosition = window.scrollY;
      setIsTransparent(scrollPosition < 50);
    };

    // Initial check
    handleScroll();
    
    // Add event listener
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Navbar */}
      <header 
        ref={navbarRef}
        className={`navbar ${isHomePage ? (isTransparent ? "transparent" : "scrolled") : "static-black"} 
                   ${isMobileMenuOpen ? "mobile-open" : ""}`}
      >
        <div className="navbar-container">
          <div className="logo-container">
            <Link to="/" className="logo">
              {/* Replace with your actual logo */}
              <span className="logo-text">MOM's KITCHEN</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation Links */}
          <nav className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/cart">
                <span className="icon-link">
                  <ShoppingCart size={18} />
                  <span>Cart</span>
                </span>
              </Link></li>
              <li><Link to="/aboutus">About Us</Link></li>
              <li>
                <button 
                  className="nav-link login-link" 
                  onClick={() => setIsLoginOpen(true)}
                  aria-label="Open login form"
                >
                  <span className="icon-link">
                    <User size={18} />
                    <span>Login</span>
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}

      {/* Login Modal */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default Navbar;