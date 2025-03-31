import React, { useEffect, useState } from "react";
import "./Home.css";
import CategorySection from "../components/CategorySection";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Import images
import img1 from "../assets/chef1.png";
import img2 from "../assets/food1.png";
import img3 from "../assets/hotel1.png";
import img4 from "../assets/banquet1.png";
import img5 from "../assets/waiter1.png";
import img6 from "../assets/main1.png";

const hotelInfo = [
  { img: img1, text: "Watch expert chefs create delicious meals live, blending aroma and artistry.", title: "Expert Chefs" },
  { img: img2, text: "Savor gourmet dishes, from authentic Italian pasta to wood-fired pizzas.", title: "Gourmet Cuisine" },
  { img: img3, text: "Dine in a stylish, cozy space perfect for socializing or a peaceful meal.", title: "Elegant Ambiance" },
  { img: img4, text: "Enjoy a diverse buffet with fresh, nutritious meals catering to all tastes.", title: "Fresh Buffet" },
  { img: img5, text: "Experience top-tier hospitality with attentive staff ensuring your comfort.", title: "Premium Service" },
  { img: img6, text: "A modern reception with elegant décor and seamless check-in service.", title: "Warm Welcome" },
];

function Home() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    info: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check if hotel info section is visible
      const infoSection = document.querySelector(".hotel-info-container");
      if (infoSection) {
        const infoPosition = infoSection.getBoundingClientRect();
        if (infoPosition.top < window.innerHeight - 100) {
          setIsVisible(prev => ({ ...prev, info: true }));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-container">
        <div className="overlay"></div>
        <div className="hero-content">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="hero-title"
          >
            Welcome to Mom's Kitchen
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hero-subtitle"
          >
            Delicious homemade food that feels like it's cooked by Mom
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <button className="cta-button" onClick={() => navigate("/menu")}>
                Explore Our Menu
            </button>
          </motion.div>
        </div>
        <div className="scroll-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Intro Section */}
      <section className="intro-section">
        <div className="intro-content">
          <h2>Experience the Magic of Home Cooking</h2>
          <p>At Mom's Kitchen, we bring you the warmth and comfort of home-cooked meals with the finesse of professional culinary expertise. Every dish tells a story of tradition, love, and passion for food.</p>
        </div>
      </section>

      {/* Category Section */}
      <CategorySection />
      
      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>What Makes Us Special</h2>
          <p>Discover the unique experiences that await you at Mom's Kitchen</p>
        </div>
        <div className="hotel-info-container">
          {hotelInfo.map((item, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              initial="hidden"
              animate={isVisible.info ? "visible" : "hidden"}
              custom={index}
              variants={cardVariants}
            >
              <div className="image-container">
                <img src={item.img} alt={item.title} className="feature-img"/>
                <div className="image-overlay"></div>
              </div>
              <div className="info-content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial Section (New) */}
      <section className="testimonial-section">
        <div className="testimonial-container">
          <div className="quote-icon">"</div>
          <p className="testimonial-text">The food at Mom's Kitchen reminded me of my grandmother's cooking. Every bite was filled with nostalgia and incredible flavor. I can't wait to return!</p>
          <div className="testimonial-author">
            <p className="author-name">Sarah Johnson</p>
            <p className="author-title">Food Enthusiast</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;