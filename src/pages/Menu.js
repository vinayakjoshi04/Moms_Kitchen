// /src/pages/Menu.js

import React, { useRef, useState, useMemo, useCallback } from "react";
import "./Menu.css"; 
import Footer from "../components/Footer.js";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import pannerButter from "../assets/paneer_butter.png";
import choleBhature from "../assets/chole_bhature.png";
import hyderabadiBiryani from "../assets/hyderabadi_biryani.png";
import dalMakhani from "../assets/dalMakhani.png";
import masalaDosa from "../assets/masala_dosa.png";
import butterChicken from "../assets/butter_chicken.png";
import chickenTikka from "../assets/chicken_tikka_masala.png";
import rajmaChaval from "../assets/rajma_chaval.png";
import dalBati from "../assets/dal_bati.png";
import dalFry from "../assets/dal_fry_masala.png";
import dalTadka from "../assets/dal_tadka.png";
import idliSambhar from "../assets/idli_sambhar.png";
import khamanDhokla from "../assets/khaman_dhokla.png";
import palakPaneer from "../assets/palak_paneer.png";
import doubleCheeseMargherita from "../assets/double_cheese_margherita.png";
import bbqChicken from "../assets/bbq_chicken_pizza.png";
import doublegrilledChicken from "../assets/double_grilled_chicken_burger.png";
import vegcheeseBurger from "../assets/veg_cheese_burger.png";
import chickenwhiteSauce from "../assets/chicken_whitesauce_pasta.png";
import chocoLavacake from "../assets/choco_lava_cake.png";
import chocolateCake from "../assets/chocolate_cake.png";

// Dynamically load all images from dish_images/ folder
import dishImages from "../components/imageLoader";

// Fallback for missing images
import fallbackImage from "../assets/drink.png"; 

/* 
  Master category array.
  We only store "name" here, since we get images dynamically.
*/
const dishes = [
  { name: "Chicken" },
  { name: "Pizza" },
  { name: "Burger" },
  { name: "Pasta" },
  { name: "Noodles" },
  { name: "Chinese" },
  { name: "Momos" },
  { name: "Paratha" },
  { name: "North Indian" },
  { name: "South Indian" },
  { name: "Shawarma" },
  { name: "Rolls" },
  { name: "Desserts" },
  { name: "Drinks" },
  { name: "Punjabi" },
  { name: "Maharashtrian" },
  { name: "Gujarati" },
  { name: "Rajasthani" },
];

/* 
  bestDishes: 
  "Customer Favorites" or "Popular Items" list
*/
const bestDishes = [
  { name: "Paneer Butter Masala", Price: 260, image: pannerButter },
  { name: "Chole Bhature", Price: 220, image: choleBhature },
  { name: "Hyderabadi Biryani", Price: 280, image: hyderabadiBiryani },
  { name: "Dal Makhani", Price: 210, image: dalMakhani },
  { name: "Masala Dosa", Price: 130, image: masalaDosa },
  { name: "Butter Chicken", Price: 280, image: butterChicken },
  { name: "Chicken Tikka Masala", Price: 300, image: chickenTikka },
  { name: "Rajma Chawal", Price: 180, image: rajmaChaval },
  { name: "Dal Bati", Price: 140, image: dalBati },
  { name: "Dal Fry Masala", Price: 180, image: dalFry },
  { name: "Dal Tadka", Price: 190, image: dalTadka },
  { name: "Idli Sambhar", Price: 120, image: idliSambhar },
  { name: "Khaman Dhokla", Price: 140, image: khamanDhokla },
  { name: "Palak Paneer", Price: 190, image: palakPaneer },
  { name: "Double Cheese Margherita Pizza", Price: 170, image: doubleCheeseMargherita },
  { name: "BBQ Chicken Pizza", Price: 180, image: bbqChicken },
  { name: "Double Grilled Chicken Burger", Price: 190, image: doublegrilledChicken },
  { name: "Veg Cheese Burger", Price: 140, image: vegcheeseBurger },
  { name: "Chicken White Sauce Pasta", Price: 130, image: chickenwhiteSauce },
  { name: "Choco Lava Cake", Price: 120, image: chocoLavacake },
  { name: "Chocolate Cake", Price: 140, image: chocolateCake },
];

/*
  subcategoryDishes: 
  Each category name => an array of dish objects.
  We have removed any "image:" references. 
  The dynamic code will supply images automatically.
*/
const subcategoryDishes = {
  Chicken: [
    { name: "Butter Chicken", Price: 240 },
    { name: "Tandoori Chicken", Price: 300 },
    { name: "Chicken Tikka", Price: 280 },
    { name: "Chicken Biryani", Price: 260 },
    { name: "Chicken 65", Price: 220 },
    { name: "Grilled Chicken", Price: 270 },
    { name: "Chicken Curry", Price: 250 },
    { name: "Chicken Kebab", Price: 260 },
    { name: "Chicken Shawarma", Price: 200 },
    { name: "Chicken Manchurian", Price: 230 },
    { name: "Garlic Chicken", Price: 210 },
    { name: "Lemon Chicken", Price: 220 },
    { name: "Malai Chicken", Price: 240 },
    { name: "Chicken Roll", Price: 180 },
    { name: "Chilli Chicken", Price: 220 },
    { name: "Chicken Pakora", Price: 190 },
    { name: "Peri Peri Chicken", Price: 270 },
    { name: "Chicken Wings", Price: 280 },
  ],
  Pizza: [
    { name: "Cheese Pizza", Price: 180 },
    { name: "Paneer Pizza", Price: 200 },
    { name: "BBQ Chicken Pizza", Price: 230 },
    { name: "Pepperoni Pizza", Price: 220 },
    { name: "Margherita Pizza", Price: 190 },
    { name: "Veggie Supreme Pizza", Price: 210 },
    { name: "Hawaiian Pizza", Price: 200 },
    { name: "Sicilian Pizza", Price: 240 },
    { name: "Neapolitan Pizza", Price: 250 },
    { name: "Four Cheese Pizza", Price: 260 },
    { name: "Mushroom Pizza", Price: 220 },
    { name: "White Sauce Pizza", Price: 210 },
    { name: "Meat Lover's Pizza", Price: 280 },
    { name: "Greek Pizza", Price: 230 },
    { name: "BBQ Paneer Pizza", Price: 220 },
    { name: "Jalapeno Pizza", Price: 210 },
    { name: "Tandoori Paneer Pizza", Price: 250 },
    { name: "Fajita Pizza", Price: 270 },
  ],
  Burger: [
    { name: "Cheese Burger", Price: 150 },
    { name: "Chicken Burger", Price: 180 },
    { name: "Veggie Burger", Price: 140 },
    { name: "Grilled Chicken Burger", Price: 190 },
    { name: "Double Patty Burger", Price: 200 },
    { name: "Crispy Chicken Burger", Price: 170 },
    { name: "BBQ Burger", Price: 160 },
    { name: "Paneer Burger", Price: 180 },
    { name: "Mushroom Swiss Burger", Price: 210 },
    { name: "Spicy Mexican Burger", Price: 190 },
    { name: "Fish Burger", Price: 200 },
    { name: "Zinger Burger", Price: 220 },
    { name: "Aloo Tikki Burger", Price: 130 },
    { name: "Tandoori Burger", Price: 180 },
    { name: "Black Bean Burger", Price: 160 },
    { name: "Turkey Burger", Price: 210 },
    { name: "Peri Peri Burger", Price: 200 },
    { name: "Lamb Burger", Price: 230 },
  ],
  Pasta: [
    { name: "White Sauce Pasta", Price: 160 },
    { name: "Red Sauce Pasta", Price: 150 },
    { name: "Pesto Pasta", Price: 170 },
    { name: "Mac & Cheese", Price: 180 },
    { name: "Lasagna", Price: 220 },
    { name: "Alfredo Pasta", Price: 190 },
    { name: "Arrabiata Pasta", Price: 180 },
    { name: "Penne Pasta", Price: 170 },
    { name: "Spaghetti Bolognese", Price: 230 },
    { name: "Fettuccine Alfredo", Price: 210 },
    { name: "Carbonara Pasta", Price: 240 },
    { name: "Mushroom Pasta", Price: 190 },
    { name: "Chicken Pasta", Price: 220 },
    { name: "Seafood Pasta", Price: 250 },
    { name: "Veggie Delight Pasta", Price: 230 },
    { name: "Tomato Basil Pasta", Price: 250 },
    { name: "Cheesy Garlic Pasta", Price: 240 },
    { name: "Creamy Spinach Pasta", Price: 210 },
  ],
  Noodles: [
    { name: "Hakka Noodles", Price: 150 },
    { name: "Chow Mein", Price: 160 },
    { name: "Schezwan Noodles", Price: 170 },
    { name: "Egg Noodles", Price: 180 },
    { name: "Garlic Noodles", Price: 160 },
    { name: "Stir-Fry Noodles", Price: 175 },
    { name: "Pad Thai", Price: 200 },
    { name: "Chicken Noodles", Price: 190 },
    { name: "Veg Noodles", Price: 160 },
    { name: "Manchurian Noodles", Price: 180 },
    { name: "Dan Dan Noodles", Price: 210 },
    { name: "Udon Noodles", Price: 230 },
    { name: "Ramen", Price: 250 },
    { name: "Lo Mein", Price: 190 },
    { name: "Sesame Noodles", Price: 170 },
    { name: "Singapore Noodles", Price: 200 },
    { name: "Soba Noodles", Price: 220 },
    { name: "Chili Garlic Noodles", Price: 180 },
  ],
  Chinese: [
    { name: "Manchurian", Price: 180 },
    { name: "Spring Rolls", Price: 160 },
    { name: "Fried Rice", Price: 170 },
    { name: "Sweet and Sour Chicken", Price: 190 },
    { name: "Kung Pao Chicken", Price: 210 },
    { name: "Chili Paneer", Price: 200 },
    { name: "Hot and Sour Soup", Price: 160 },
    { name: "Dimsums", Price: 150 },
    { name: "Honey Chili Potatoes", Price: 170 },
    { name: "Szechuan Chicken", Price: 220 },
    { name: "Beijing Duck", Price: 350 },
    { name: "Chow Mein", Price: 180 },
    { name: "Peking Soup", Price: 200 },
    { name: "Lemon Chicken", Price: 210 },
    { name: "Teriyaki Chicken", Price: 220 },
    { name: "Sesame Tofu", Price: 190 },
    { name: "Crispy Corn", Price: 160 },
    { name: "Chicken Lollipops", Price: 230 },
  ],
  Momos: [
    { name: "Steamed Momos", Price: 120 },
    { name: "Fried Momos", Price: 130 },
    { name: "Tandoori Momos", Price: 150 },
    { name: "Chilli Momos", Price: 140 },
    { name: "Cheese Momos", Price: 160 },
    { name: "Chocolate Momos", Price: 170 },
    { name: "Malai Momos", Price: 150 },
    { name: "Afghani Momos", Price: 180 },
    { name: "Peri Peri Momos", Price: 190 },
    { name: "Prawn Momos", Price: 200 },
    { name: "BBQ Momos", Price: 190 },
    { name: "Butter Chicken Momos", Price: 210 },
    { name: "Mutton Momos", Price: 220 },
    { name: "Spicy Mayo Momos", Price: 180 },
    { name: "Schezwan Momos", Price: 160 },
    { name: "Paneer Momos", Price: 170 },
    { name: "Veg Momos", Price: 140 },
    { name: "Garlic Butter Momos", Price: 180 },
  ],
  Paratha: [
    { name: "Aloo Paratha", Price: 90 },
    { name: "Paneer Paratha", Price: 120 },
    { name: "Methi Paratha", Price: 80 },
    { name: "Gobi Paratha", Price: 100 },
    { name: "Cheese Paratha", Price: 130 },
    { name: "Lachha Paratha", Price: 110 },
    { name: "Ajwain Paratha", Price: 90 },
    { name: "Dal Paratha", Price: 100 },
    { name: "Malabar Paratha", Price: 150 },
    { name: "Mooli Paratha", Price: 110 },
    { name: "Egg Paratha", Price: 130 },
    { name: "Mix Veg Paratha", Price: 140 },
    { name: "Pizza Paratha", Price: 160 },
    { name: "Keema Paratha", Price: 170 },
    { name: "Onion Paratha", Price: 110 },
    { name: "Corn Paratha", Price: 120 },
    { name: "Chocolate Paratha", Price: 150 },
    { name: "Mushroom Paratha", Price: 140 },
  ],
  "North Indian": [
    { name: "Dal Makhani", Price: 200 },
    { name: "Chole Bhature", Price: 180 },
    { name: "Rajma Chawal", Price: 190 },
    { name: "Kadai Paneer", Price: 220 },
    { name: "Butter Naan", Price: 50 },
    { name: "Aloo Gobhi", Price: 170 },
    { name: "Shahi Paneer", Price: 230 },
    { name: "Palak Paneer", Price: 210 },
    { name: "Baingan Bharta", Price: 180 },
    { name: "Paneer Tikka", Price: 250 },
    { name: "Stuffed Capsicum", Price: 200 },
    { name: "Missi Roti", Price: 60 },
    { name: "Mughlai Paratha", Price: 190 },
    { name: "Dum Aloo", Price: 200 },
    { name: "Kashmiri Pulao", Price: 240 },
    { name: "Tandoori Roti", Price: 30 },
    { name: "Amritsari Kulcha", Price: 220 },
    { name: "Malai Kofta", Price: 230 },
  ],
  "South Indian": [
    { name: "Masala Dosa", Price: 120 },
    { name: "Idli Sambar", Price: 80 },
    { name: "Vada", Price: 90 },
    { name: "Uttapam", Price: 110 },
    { name: "Pesarattu", Price: 100 },
    { name: "Neer Dosa", Price: 130 },
    { name: "Set Dosa", Price: 120 },
    { name: "Appam", Price: 140 },
    { name: "Rava Dosa", Price: 130 },
    { name: "Chettinad Curry", Price: 200 },
    { name: "Medu Vada", Price: 100 },
    { name: "Curd Rice", Price: 110 },
    { name: "Sambar Vada", Price: 120 },
    { name: "Tomato Rasam", Price: 90 },
    { name: "Gongura Pickle", Price: 150 },
    { name: "Avial", Price: 180 },
    { name: "Coconut Chutney", Price: 70 },
    { name: "Lemon Rice", Price: 130 },
  ],
  Shawarma: [
    { name: "Chicken Shawarma", Price: 150 },
    { name: "Beef Shawarma", Price: 170 },
    { name: "Lamb Shawarma", Price: 180 },
    { name: "Falafel Shawarma", Price: 140 },
    { name: "Cheese Shawarma", Price: 160 },
    { name: "Spicy Shawarma", Price: 170 },
    { name: "BBQ Shawarma", Price: 180 },
    { name: "Garlic Mayo Shawarma", Price: 150 },
    { name: "Veg Shawarma", Price: 130 },
    { name: "Paneer Shawarma", Price: 140 },
    { name: "Tandoori Shawarma", Price: 160 },
    { name: "Peri Peri Shawarma", Price: 170 },
    { name: "Greek Shawarma", Price: 190 },
    { name: "Turkish Shawarma", Price: 200 },
    { name: "Hummus Shawarma", Price: 180 },
    { name: "Creamy Shawarma", Price: 170 },
    { name: "Pita Shawarma", Price: 160 },
    { name: "Lebanese Shawarma", Price: 190 },
  ],
  Rolls: [
    { name: "Egg Roll", Price: 100 },
    { name: "Paneer Roll", Price: 120 },
    { name: "Chicken Roll", Price: 150 },
    { name: "Mutton Roll", Price: 180 },
    { name: "Kathi Roll", Price: 140 },
    { name: "Cheese Roll", Price: 130 },
    { name: "Veg Roll", Price: 110 },
    { name: "Frankie Roll", Price: 130 },
    { name: "BBQ Roll", Price: 150 },
    { name: "Spring Roll", Price: 140 },
    { name: "Tandoori Roll", Price: 160 },
    { name: "Hakka Noodles Roll", Price: 170 },
    { name: "Spicy Mayo Roll", Price: 150 },
    { name: "Peri Peri Roll", Price: 160 },
    { name: "Chili Garlic Roll", Price: 140 },
    { name: "Lebanese Roll", Price: 170 },
    { name: "Corn Roll", Price: 130 },
    { name: "Chocolate Roll", Price: 120 },
  ],
  Deserts: [
    { name: "Gulab Jamun", Price: 100 },
    { name: "Ras Malai", Price: 120 },
    { name: "Kheer", Price: 110 },
    { name: "Jalebi", Price: 90 },
    { name: "Barfi", Price: 130 },
    { name: "Laddu", Price: 80 },
    { name: "Halwa", Price: 110 },
    { name: "Cake", Price: 150 },
    { name: "Brownie", Price: 160 },
    { name: "Ice Cream", Price: 140 },
    { name: "Mousse", Price: 170 },
    { name: "Custard", Price: 120 },
    { name: "Fruit Salad", Price: 100 },
    { name: "Sponge Cake", Price: 180 },
    { name: "Shahi Tukda", Price: 170 },
    { name: "Basundi", Price: 150 },
    { name: "Modak", Price: 130 },
    { name: "Muffin", Price: 120 },
  ],
  Drinks: [
    { name: "Tea", Price: 30 },
    { name: "Coffee", Price: 50 },
    { name: "Milkshake", Price: 80 },
    { name: "Lassi", Price: 70 },
    { name: "Cold Coffee", Price: 90 },
    { name: "Lemonade", Price: 60 },
    { name: "Mocktail", Price: 120 },
    { name: "Fruit Juice", Price: 100 },
    { name: "Soda", Price: 40 },
    { name: "Coconut Water", Price: 50 },
    { name: "Buttermilk", Price: 45 },
    { name: "Thandai", Price: 110 },
    { name: "Sugarcane Juice", Price: 50 },
    { name: "Falooda", Price: 130 },
    { name: "Smoothie", Price: 120 },
    { name: "Green Tea", Price: 70 },
    { name: "Herbal Tea", Price: 80 },
    { name: "Masala Chai", Price: 40 },
  ],
  Punjabi: [
    { name: "Chole Bhature", Price: 150 },
    { name: "Dal Makhani", Price: 130 },
    { name: "Butter Chicken", Price: 200 },
    { name: "Paneer Tikka", Price: 180 },
    { name: "Amritsari Kulcha", Price: 140 },
    { name: "Sarson da Saag & Makki di Roti", Price: 160 },
    { name: "Rajma Chawal", Price: 120 },
    { name: "Tandoori Chicken", Price: 250 },
    { name: "Kadai Paneer", Price: 180 },
    { name: "Punjabi Kadhi Pakora", Price: 110 },
    { name: "Stuffed Paratha", Price: 90 },
    { name: "Chicken Tikka Masala", Price: 220 },
    { name: "Mutton Rogan Josh", Price: 260 },
    { name: "Pindi Chana", Price: 130 },
    { name: "Aloo Puri", Price: 100 },
    { name: "Lassi", Price: 70 },
    { name: "Besan Ladoo", Price: 110 },
    { name: "Gajar ka Halwa", Price: 120 },
  ],
  Maharashtrian: [
    { name: "Pav Bhaji", Price: 140 },
    { name: "Vada Pav", Price: 50 },
    { name: "Misal Pav", Price: 120 },
    { name: "Puran Poli", Price: 130 },
    { name: "Thalipeeth", Price: 100 },
    { name: "Bhakarwadi", Price: 90 },
    { name: "Kanda Poha", Price: 80 },
    { name: "Zunka Bhakri", Price: 110 },
    { name: "Sabudana Khichdi", Price: 130 },
    { name: "Batata Vada", Price: 90 },
    { name: "Ukadiche Modak", Price: 150 },
    { name: "Sol Kadhi", Price: 70 },
    { name: "Bombil Fry", Price: 180 },
    { name: "Maharashtrian Pithla", Price: 120 },
    { name: "Kharvas", Price: 130 },
    { name: "Ragda Pattice", Price: 110 },
    { name: "Kolhapuri Chicken", Price: 250 },
    { name: "Shrikhand", Price: 140 },
  ],
  Gujarati: [
    { name: "Dhokla", Price: 100 },
    { name: "Khandvi", Price: 90 },
    { name: "Thepla", Price: 80 },
    { name: "Handvo", Price: 110 },
    { name: "Undhiyu", Price: 140 },
    { name: "Fafda", Price: 90 },
    { name: "Jalebi", Price: 100 },
    { name: "Dal Dhokli", Price: 120 },
    { name: "Gujarati Kadhi", Price: 80 },
    { name: "Lilva Kachori", Price: 110 },
    { name: "Sev Tameta", Price: 130 },
    { name: "Bardoli Khichdi", Price: 120 },
    { name: "Methi Thepla", Price: 90 },
    { name: "Patra", Price: 110 },
    { name: "Mohanthal", Price: 140 },
    { name: "Gathiya", Price: 90 },
    { name: "Surti Locho", Price: 110 },
    { name: "Rotlo with Ringan no Olo", Price: 130 },
  ],
  Rajasthani: [
    { name: "Dal Baati Churma", Price: 160 },
    { name: "Gatte ki Sabzi", Price: 130 },
    { name: "Laal Maas", Price: 250 },
    { name: "Ker Sangri", Price: 120 },
    { name: "Mohan Maas", Price: 260 },
    { name: "Pyaaz Kachori", Price: 100 },
    { name: "Mirchi Bada", Price: 110 },
    { name: "Bajre ki Roti with Lehsun Chutney", Price: 90 },
    { name: "Mawa Kachori", Price: 140 },
    { name: "Churma Ladoo", Price: 120 },
    { name: "Malpua", Price: 130 },
    { name: "Aloo Pyaaz Sabzi", Price: 110 },
    { name: "Jodhpuri Mirchi Vada", Price: 100 },
    { name: "Rajasthani Kadhi", Price: 90 },
    { name: "Kachri ki Chutney", Price: 70 },
    { name: "Rabri Ghevar", Price: 150 },
    { name: "Bikaneri Bhujia", Price: 100 },
    { name: "Haldi Ki Sabzi", Price: 120 },
  ],
};

// Convert a dish name -> a valid image key
function toImageKey(dishName) {
  return dishName
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^\w]/g, "");
}

// Category Card for the horizontal scroll
const DishCategoryCard = ({ dish, onClick }) => {
  const imageKey = toImageKey(dish.name);
  const key = toImageKey(dish.name);
  console.log(`Dish: ${dish.name}, Key: ${key}, Found?`, dishImages[key]);
  const dishImage = dishImages[imageKey] || fallbackImage;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="dish-card"
      style={{ backgroundImage: `url(${dishImage})` }}
      onClick={() => onClick(dish.name)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick(dish.name);
        }
      }}
      aria-label={`View ${dish.name} category`}
    >
      <div className="dish-overlay">
        <h3>{dish.name}</h3>
      </div>
    </motion.div>
  );
};

// Single grid item
const DishGridItem = ({ dish, quantity, onIncrease, onDecrease, onAddToCart }) => {
  const imageKey = toImageKey(dish.name);
  const dishImage = dishImages[imageKey] || fallbackImage;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="grid-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="dish-image">
        <img src={dishImage} alt={dish.name} loading="lazy" />
        {dish.isPopular && <span className="popular-badge">Popular</span>}
      </div>
      <div className="dish-details">
        <h3 className="dish-name">{dish.name}</h3>
        <p className="dish-price">₹{dish.Price}</p>
        {dish.description && (
          <p className="dish-description">{dish.description}</p>
        )}

        <div className="quantity-controls">
          <button
            onClick={() => onDecrease(dish.name)}
            aria-label="Decrease quantity"
            className="quantity-btn decrease"
          >
            <span aria-hidden="true">−</span>
          </button>
          <span className="quantity-display">{quantity || 0}</span>
          <button
            onClick={() => onIncrease(dish.name)}
            aria-label="Increase quantity"
            className="quantity-btn increase"
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>

        <button
          className={`add-to-cart ${quantity ? "active" : ""}`}
          onClick={() => onAddToCart(dish)}
          disabled={!quantity}
        >
          {quantity ? "Add to Cart" : "Select Quantity"}
        </button>
      </div>
    </motion.div>
  );
};

const SearchBox = ({ searchTerm, setSearchTerm }) => (
  <div className="search-box">
    <input
      type="text"
      placeholder="Search dishes..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      aria-label="Search dishes"
    />
    <button type="button" aria-label="Search">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path
          fill="white"
          d="M21.53 20.47l-5.42-5.42A7.92 7.92 0 0018 10a8 8 0 10-8 8 7.92 7.92 0 005.05-1.89l5.42 5.42a1 1 0 001.41-1.41zM10 16a6 6 0 116-6 6 6 0 01-6 6z"
        />
      </svg>
    </button>
  </div>
);

// Main Menu component
function Menu({ cart, setCart }) {
  const scrollRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDish, setSelectedDish] = useState(null);
  const [quantities, setQuantities] = useState({});

  // Flatten subcategories + categories + bestDishes for searching
  const allDishes = useMemo(() => {
    const flattenedSubcats = Object.values(subcategoryDishes).flat();
    return [...dishes, ...bestDishes, ...flattenedSubcats];
  }, []);

  // Filter by search
  const filteredDishes = useMemo(() => {
    return allDishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allDishes, searchTerm]);

  // Increase / decrease quantity
  const increaseQuantity = useCallback((dishName) => {
    setQuantities((prev) => ({
      ...prev,
      [dishName]: (prev[dishName] || 0) + 1,
    }));
  }, []);

  const decreaseQuantity = useCallback((dishName) => {
    setQuantities((prev) => ({
      ...prev,
      [dishName]: Math.max((prev[dishName] || 0) - 1, 0),
    }));
  }, []);

  // Add to cart
  const addToCart = useCallback((dish) => {
    const quantity = quantities[dish.name] || 0;
    if (quantity > 0) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.name === dish.name);
        if (existingItem) {
          return prevCart.map((item) =>
            item.name === dish.name
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevCart, { ...dish, quantity }];
        }
      });
      // Reset quantity
      setQuantities((prev) => ({ ...prev, [dish.name]: 0 }));
    }
  }, [quantities, setCart]);

  // Select category
  const handleCategorySelect = useCallback((dishName) => {
    setSelectedDish(dishName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="menu-title">Our Menu</h1>
        <p className="menu-subtitle">Discover our delicious offerings</p>
      </div>

      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {searchTerm ? (
        // Show search results
        <motion.div
          className="grid-wrapper search-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="grid-title">
            {filteredDishes.length > 0 ? "Search Results" : "No Results Found"}
          </h2>

          {filteredDishes.length === 0 && (
            <div className="no-results">
              <p>No dishes match your search. Try a different term.</p>
            </div>
          )}

          <div className="grid-container">
            {filteredDishes.map((dish, index) => (
              <DishGridItem
                key={`search-${dish.name}-${index}`}
                dish={dish}
                quantity={quantities[dish.name] || 0}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </motion.div>
      ) : selectedDish && subcategoryDishes[selectedDish] ? (
        // Show subcategory dishes for the selected category
        <motion.div
          className="grid-wrapper subcategory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="grid-title">{selectedDish} Varieties</h2>
          <button
            className="back-button"
            onClick={() => setSelectedDish(null)}
            aria-label="Back to categories"
          >
            <span aria-hidden="true">⬅</span> Back to Categories
          </button>

          <div className="grid-container">
            {subcategoryDishes[selectedDish].map((dish, index) => (
              <DishGridItem
                key={`subcat-${dish.name}-${index}`}
                dish={dish}
                quantity={quantities[dish.name] || 0}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </motion.div>
      ) : (
        // Show main categories + best dishes
        <>
          <section aria-labelledby="categories-heading">
            <h2 id="categories-heading" className="section-title">
              Categories
            </h2>
            <div className="scroll-wrapper">
              <div className="scroll-container" ref={scrollRef}>
                {dishes.map((dish, index) => (
                  <DishCategoryCard
                    key={`cat-${dish.name}-${index}`}
                    dish={dish}
                    onClick={handleCategorySelect}
                  />
                ))}
              </div>
              <button
                className="scroll-button left"
                onClick={() => {
                  scrollRef.current.scrollBy({
                    left: -300,
                    behavior: "smooth",
                  });
                }}
                aria-label="Scroll left"
              >
                ‹
              </button>
              <button
                className="scroll-button right"
                onClick={() => {
                  scrollRef.current.scrollBy({
                    left: 300,
                    behavior: "smooth",
                  });
                }}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>
          </section>

          <motion.div
            className="grid-wrapper popular-dishes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="grid-title">Customer Favorites</h2>
            <div className="grid-container">
              {bestDishes.map((dish, index) => (
                <DishGridItem
                  key={`popular-${dish.name}-${index}`}
                  dish={{ ...dish, isPopular: true }}
                  quantity={quantities[dish.name] || 0}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

Menu.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default React.memo(Menu);
