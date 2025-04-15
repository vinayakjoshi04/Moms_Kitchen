import React, { useState, useEffect } from "react";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "./AuthProvider";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AccountPage from "./pages/AccountPage";
import "./App.css";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Function to update the document title dynamically
function UpdateTitle() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Mom's Kitchen - Home",
      "/menu": "Menu | Mom's Kitchen",
      "/cart": "Cart | Mom's Kitchen",
      "/aboutus": "About Us | Mom's Kitchen",
      "/login": "Login | Mom's Kitchen",
    };

    document.title = titles[location.pathname] || "Mom's Kitchen";
  }, [location.pathname]);

  return null; // This component doesn't render anything
}

// App content with routing
function AppContent({ cart, setCart }) {
  const { user, setUser } = useAuth();
  return (
    <>
      <UpdateTitle /> {/* Title updater component */}
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/menu" element={<Menu cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
  path="/account"
  element={<AccountPage user={user} setUser={setUser} />}
/>

      </Routes>
      {/* Footer is always shown */}
      <Footer />
    </>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
    <AuthProvider>
    <AppContent cart={cart} setCart={setCart} />
    </AuthProvider>
    </Router>
  );
}

export default App;