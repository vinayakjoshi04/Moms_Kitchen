import React, { useRef, useState, useMemo, useCallback } from 'react';
import "./Menu.css"; // Import CSS file for styling
import Footer from "../components/Footer.js"; // Import Footer Component
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

// Import all images
import chicken from "../assets/chicken.png";
import pizza from "../assets/pizza.png";
import burger from "../assets/burger.png";
import pasta from "../assets/pasta.png";
import noodles from "../assets/noodles.png";
import chinese from "../assets/chinese.png";
import momos from "../assets/momos.png";
import paratha from "../assets/paratha.png";
import northIndian from "../assets/thali.png";
import shawarma from "../assets/shawarma.png";
import rolls from "../assets/rolls.png";
import deserts from "../assets/deserts.png";
import drinks from "../assets/drink.png";
import punjabi from "../assets/punjabi.png";
import maharashtrian from "../assets/maharashtrian.png";
import gujarati from "../assets/gujarati.png";
import rajasthani from "../assets/rajasthani.png";
import southIndian from "../assets/southindian.png";
import pannerButter from "../assets/paneer_butter.png";
import choleBhature from "../assets/chole_bhature.png";
import hyderabadiBiryani from "../assets/hyderabadi_biryani.png";
import dalMakhani from "../assets/dalMakhani.png";
import masalaDosa from "../assets/masala_dosa.png";
import butterChicken from "../assets/butter_chicken.png";
import chickenTikka from "../assets/chicken_tikka_masala.png"
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

// Define dish categories
const dishes = [
  { name: "Chicken", image: chicken },
  { name: "Pizza", image: pizza },
  { name: "Burger", image: burger },
  { name: "Pasta", image: pasta },
  { name: "Noodles", image: noodles },
  { name: "Chinese", image: chinese },
  { name: "Momos", image: momos },
  { name: "Paratha", image: paratha },
  { name: "North Indian", image: northIndian },
  { name: "South Indian", image: southIndian },
  { name: "Shawarma", image: shawarma },
  { name: "Rolls", image: rolls },
  { name: "Deserts", image: deserts },
  { name: "Drinks", image: drinks },
  { name: "Punjabi", image: punjabi },
  { name: "Maharashtrian", image: maharashtrian },
  { name: "Gujarati", image: gujarati },
  { name: "Rajasthani", image: rajasthani },
];

// Default best dishes
const bestDishes = [
  { name: "Paneer Butter Masala", Price: 260, image: pannerButter },
  { name: "Chole Bhature", Price: 220, image: choleBhature },
  { name: "Hyderabadi Biryani", Price: 280, image: hyderabadiBiryani },
  { name: "Dal Makhani", Price: 210, image: dalMakhani },
  { name: "Masala Dosa", Price: 130, image: masalaDosa },
  { name: "Butter Chicken", Price: 280, image: butterChicken },
  { name: "Chicken Tikka Masala", Price: 300, image: chickenTikka },
  { name: "Rajma Chaval", Price: 180, image: rajmaChaval },
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
  { name: "Chococolate Cake", Price: 140, image: chocolateCake },
];

// Subcategory Dishes
const subcategoryDishes = {
  Chicken: [
    { name: "Butter Chicken", Price: 240, image: chicken },
    { name: "Tandoori Chicken", Price: 300, image: chicken },
    { name: "Chicken Tikka", Price: 280, image: chicken },
    { name: "Chicken Biryani", Price: 260, image: chicken },
    { name: "Chicken 65", Price: 220, image: chicken },
    { name: "Grilled Chicken", Price: 270, image: chicken },
    { name: "Chicken Curry", Price: 250, image: chicken },
    { name: "Chicken Kebab", Price: 260, image: chicken },
    { name: "Chicken Shawarma", Price: 200, image: chicken },
    { name: "Chicken Manchurian", Price: 230, image: chicken },
    { name: "Garlic Chicken", Price: 210, image: chicken },
    { name: "Lemon Chicken", Price: 220, image: chicken },
    { name: "Malai Chicken", Price: 240, image: chicken },
    { name: "Chicken Roll", Price: 180, image: chicken },
    { name: "Chilli Chicken", Price: 220, image: chicken },
    { name: "Chicken Pakora", Price: 190, image: chicken },
    { name: "Peri Peri Chicken", Price: 270, image: chicken },
    { name: "Chicken Wings", Price: 280, image: chicken },
  ],
  Pizza: [
    { name: "Cheese Pizza", Price: 180, image: pizza },
    { name: "Paneer Pizza", Price: 200, image: pizza },
    { name: "BBQ Chicken Pizza", Price: 230, image: pizza },
    { name: "Pepperoni Pizza", Price: 220, image: pizza },
    { name: "Margherita Pizza", Price: 190, image: pizza },
    { name: "Veggie Supreme Pizza", Price: 210, image: pizza },
    { name: "Hawaiian Pizza", Price: 200, image: pizza },
    { name: "Sicilian Pizza", Price: 240, image: pizza },
    { name: "Neapolitan Pizza", Price: 250, image: pizza },
    { name: "Four Cheese Pizza", Price: 260, image: pizza },
    { name: "Mushroom Pizza", Price: 220, image: pizza },
    { name: "White Sauce Pizza", Price: 210, image: pizza },
    { name: "Meat Lover's Pizza", Price: 280, image: pizza },
    { name: "Greek Pizza", Price: 230, image: pizza },
    { name: "BBQ Paneer Pizza", Price: 220, image: pizza },
    { name: "Jalapeno Pizza", Price: 210, image: pizza },
    { name: "Tandoori Paneer Pizza", Price: 250, image: pizza },
    { name: "Fajita Pizza", Price: 270, image: pizza },
  ],
  Burger: [
    { name: "Cheese Burger", Price: 150, image: burger },
    { name: "Chicken Burger", Price: 180, image: burger },
    { name: "Veggie Burger", Price: 140, image: burger },
    { name: "Grilled Chicken Burger", Price: 190, image: burger },
    { name: "Double Patty Burger", Price: 200, image: burger },
    { name: "Crispy Chicken Burger", Price: 170, image: burger },
    { name: "BBQ Burger", Price: 160, image: burger },
    { name: "Paneer Burger", Price: 180, image: burger },
    { name: "Mushroom Swiss Burger", Price: 210, image: burger },
    { name: "Spicy Mexican Burger", Price: 190, image: burger },
    { name: "Fish Burger", Price: 200, image: burger },
    { name: "Zinger Burger", Price: 220, image: burger },
    { name: "Aloo Tikki Burger", Price: 130, image: burger },
    { name: "Tandoori Burger", Price: 180, image: burger },
    { name: "Black Bean Burger", Price: 160, image: burger },
    { name: "Turkey Burger", Price: 210, image: burger },
    { name: "Peri Peri Burger", Price: 200, image: burger },
    { name: "Lamb Burger", Price: 230, image: burger },
  ],
  Pasta: [
    { name: "White Sauce Pasta", Price: 160, image: pasta },
    { name: "Red Sauce Pasta", Price: 150, image: pasta },
    { name: "Pesto Pasta", Price: 170, image: pasta },
    { name: "Mac & Cheese", Price: 180, image: pasta },
    { name: "Lasagna", Price: 220, image: pasta },
    { name: "Alfredo Pasta", Price: 190, image: pasta },
    { name: "Arrabiata Pasta", Price: 180, image: pasta },
    { name: "Penne Pasta", Price: 170, image: pasta },
    { name: "Spaghetti Bolognese", Price: 230, image: pasta },
    { name: "Fettuccine Alfredo", Price: 210, image: pasta },
    { name: "Carbonara Pasta", Price: 240, image: pasta },
    { name: "Mushroom Pasta", Price: 190, image: pasta },
    { name: "Chicken Pasta", Price: 220, image: pasta },
    { name: "Seafood Pasta", Price: 250, image: pasta },
    { name: "Veggie Delight Pasta", Price: 230, image: pasta },
    { name: "Tomato Basil Pasta", Price: 250, image: pasta },
    { name: "Cheesy Garlic Pasta", Price: 240, image: pasta },
    { name: "Creamy Spinach Pasta", Price: 210, image: pasta },
  ],
  Noodles: [
    { name: "Hakka Noodles", Price: 150, image: noodles },
    { name: "Chow Mein", Price: 160, image: noodles },
    { name: "Schezwan Noodles", Price: 170, image: noodles },
    { name: "Egg Noodles", Price: 180, image: noodles },
    { name: "Garlic Noodles", Price: 160, image: noodles },
    { name: "Stir-Fry Noodles", Price: 175, image: noodles },
    { name: "Pad Thai", Price: 200, image: noodles },
    { name: "Chicken Noodles", Price: 190, image: noodles },
    { name: "Veg Noodles", Price: 160, image: noodles },
    { name: "Manchurian Noodles", Price: 180, image: noodles },
    { name: "Dan Dan Noodles", Price: 210, image: noodles },
    { name: "Udon Noodles", Price: 230, image: noodles },
    { name: "Ramen", Price: 250, image: noodles },
    { name: "Lo Mein", Price: 190, image: noodles },
    { name: "Sesame Noodles", Price: 170, image: noodles },
    { name: "Singapore Noodles", Price: 200, image: noodles },
    { name: "Soba Noodles", Price: 220, image: noodles },
    { name: "Chili Garlic Noodles", Price: 180, image: noodles },
  ],
  Chinese: [
    { name: "Manchurian", Price: 180, image: chinese },
    { name: "Spring Rolls", Price: 160, image: chinese },
    { name: "Fried Rice", Price: 170, image: chinese },
    { name: "Sweet and Sour Chicken", Price: 190, image: chinese },
    { name: "Kung Pao Chicken", Price: 210, image: chinese },
    { name: "Chili Paneer", Price: 200, image: chinese },
    { name: "Hot and Sour Soup", Price: 160, image: chinese },
    { name: "Dimsums", Price: 150, image: chinese },
    { name: "Honey Chili Potatoes", Price: 170, image: chinese },
    { name: "Szechuan Chicken", Price: 220, image: chinese },
    { name: "Beijing Duck", Price: 350, image: chinese },
    { name: "Chow Mein", Price: 180, image: chinese },
    { name: "Peking Soup", Price: 200, image: chinese },
    { name: "Lemon Chicken", Price: 210, image: chinese },
    { name: "Teriyaki Chicken", Price: 220, image: chinese },
    { name: "Sesame Tofu", Price: 190, image: chinese },
    { name: "Crispy Corn", Price: 160, image: chinese },
    { name: "Chicken Lollipops", Price: 230, image: chinese },
  ],
  Momos: [
    { name: "Steamed Momos", Price: 120, image: momos },
    { name: "Fried Momos", Price: 130, image: momos },
    { name: "Tandoori Momos", Price: 150, image: momos },
    { name: "Chilli Momos", Price: 140, image: momos },
    { name: "Cheese Momos", Price: 160, image: momos },
    { name: "Chocolate Momos", Price: 170, image: momos },
    { name: "Malai Momos", Price: 150, image: momos },
    { name: "Afghani Momos", Price: 180, image: momos },
    { name: "Peri Peri Momos", Price: 190, image: momos },
    { name: "Prawn Momos", Price: 200, image: momos },
    { name: "BBQ Momos", Price: 190, image: momos },
    { name: "Butter Chicken Momos", Price: 210, image: momos },
    { name: "Mutton Momos", Price: 220, image: momos },
    { name: "Spicy Mayo Momos", Price: 180, image: momos },
    { name: "Schezwan Momos", Price: 160, image: momos },
    { name: "Paneer Momos", Price: 170, image: momos },
    { name: "Veg Momos", Price: 140, image: momos },
    { name: "Garlic Butter Momos", Price: 180, image: momos },
  ],
  Paratha: [
    { name: "Aloo Paratha", Price: 90, image: paratha },
    { name: "Paneer Paratha", Price: 120, image: paratha },
    { name: "Methi Paratha", Price: 80, image: paratha },
    { name: "Gobi Paratha", Price: 100, image: paratha },
    { name: "Cheese Paratha", Price: 130, image: paratha },
    { name: "Lachha Paratha", Price: 110, image: paratha },
    { name: "Ajwain Paratha", Price: 90, image: paratha },
    { name: "Dal Paratha", Price: 100, image: paratha },
    { name: "Malabar Paratha", Price: 150, image: paratha },
    { name: "Mooli Paratha", Price: 110, image: paratha },
    { name: "Egg Paratha", Price: 130, image: paratha },
    { name: "Mix Veg Paratha", Price: 140, image: paratha },
    { name: "Pizza Paratha", Price: 160, image: paratha },
    { name: "Keema Paratha", Price: 170, image: paratha },
    { name: "Onion Paratha", Price: 110, image: paratha },
    { name: "Corn Paratha", Price: 120, image: paratha },
    { name: "Chocolate Paratha", Price: 150, image: paratha },
    { name: "Mushroom Paratha", Price: 140, image: paratha },
  ],
  NorthIndian: [
    { name: "Dal Makhani", Price: 200, image: northIndian },
    { name: "Chole Bhature", Price: 180, image: northIndian },
    { name: "Rajma Chawal", Price: 190, image: northIndian },
    { name: "Kadai Paneer", Price: 220, image: northIndian },
    { name: "Butter Naan", Price: 50, image: northIndian },
    { name: "Aloo Gobhi", Price: 170, image: northIndian },
    { name: "Shahi Paneer", Price: 230, image: northIndian },
    { name: "Palak Paneer", Price: 210, image: northIndian },
    { name: "Baingan Bharta", Price: 180, image: northIndian },
    { name: "Paneer Tikka", Price: 250, image: northIndian },
    { name: "Stuffed Capsicum", Price: 200, image: northIndian },
    { name: "Missi Roti", Price: 60, image: northIndian },
    { name: "Mughlai Paratha", Price: 190, image: northIndian },
    { name: "Dum Aloo", Price: 200, image: northIndian },
    { name: "Kashmiri Pulao", Price: 240, image: northIndian },
    { name: "Tandoori Roti", Price: 30, image: northIndian },
    { name: "Amritsari Kulcha", Price: 220, image: northIndian },
    { name: "Malai Kofta", Price: 230, image: northIndian },
  ],
  SouthIndian: [
    { name: "Masala Dosa", Price: 120, image: southIndian },
    { name: "Idli Sambar", Price: 80, image: southIndian },
    { name: "Vada", Price: 90, image: southIndian },
    { name: "Uttapam", Price: 110, image: southIndian },
    { name: "Pesarattu", Price: 100, image: southIndian },
    { name: "Neer Dosa", Price: 130, image: southIndian },
    { name: "Set Dosa", Price: 120, image: southIndian },
    { name: "Appam", Price: 140, image: southIndian },
    { name: "Rava Dosa", Price: 130, image: southIndian },
    { name: "Chettinad Curry", Price: 200, image: southIndian },
    { name: "Medu Vada", Price: 100, image: southIndian },
    { name: "Curd Rice", Price: 110, image: southIndian },
    { name: "Sambar Vada", Price: 120, image: southIndian },
    { name: "Tomato Rasam", Price: 90, image: southIndian },
    { name: "Gongura Pickle", Price: 150, image: southIndian },
    { name: "Avial", Price: 180, image: southIndian },
    { name: "Coconut Chutney", Price: 70, image: southIndian },
    { name: "Lemon Rice", Price: 130, image: southIndian },
  ],
  Shawarma: [
    { name: "Chicken Shawarma", Price: 150, image: shawarma },
    { name: "Beef Shawarma", Price: 170, image: shawarma },
    { name: "Lamb Shawarma", Price: 180, image: shawarma },
    { name: "Falafel Shawarma", Price: 140, image: shawarma },
    { name: "Cheese Shawarma", Price: 160, image: shawarma },
    { name: "Spicy Shawarma", Price: 170, image: shawarma },
    { name: "BBQ Shawarma", Price: 180, image: shawarma },
    { name: "Garlic Mayo Shawarma", Price: 150, image: shawarma },
    { name: "Veg Shawarma", Price: 130, image: shawarma },
    { name: "Paneer Shawarma", Price: 140, image: shawarma },
    { name: "Tandoori Shawarma", Price: 160, image: shawarma },
    { name: "Peri Peri Shawarma", Price: 170, image: shawarma },
    { name: "Greek Shawarma", Price: 190, image: shawarma },
    { name: "Turkish Shawarma", Price: 200, image: shawarma },
    { name: "Hummus Shawarma", Price: 180, image: shawarma },
    { name: "Creamy Shawarma", Price: 170, image: shawarma },
    { name: "Pita Shawarma", Price: 160, image: shawarma },
    { name: "Lebanese Shawarma", Price: 190, image: shawarma },
  ],
  Rolls: [
    { name: "Egg Roll", Price: 100, image: rolls },
    { name: "Paneer Roll", Price: 120, image: rolls },
    { name: "Chicken Roll", Price: 150, image: rolls },
    { name: "Mutton Roll", Price: 180, image: rolls },
    { name: "Kathi Roll", Price: 140, image: rolls },
    { name: "Cheese Roll", Price: 130, image: rolls },
    { name: "Veg Roll", Price: 110, image: rolls },
    { name: "Frankie Roll", Price: 130, image: rolls },
    { name: "BBQ Roll", Price: 150, image: rolls },
    { name: "Spring Roll", Price: 140, image: rolls },
    { name: "Tandoori Roll", Price: 160, image: rolls },
    { name: "Hakka Noodles Roll", Price: 170, image: rolls },
    { name: "Spicy Mayo Roll", Price: 150, image: rolls },
    { name: "Peri Peri Roll", Price: 160, image: rolls },
    { name: "Chili Garlic Roll", Price: 140, image: rolls },
    { name: "Lebanese Roll", Price: 170, image: rolls },
    { name: "Corn Roll", Price: 130, image: rolls },
    { name: "Chocolate Roll", Price: 120, image: rolls },
  ],
  Deserts: [
    { name: "Gulab Jamun", Price: 100, image: deserts },
    { name: "Ras Malai", Price: 120, image: deserts },
    { name: "Kheer", Price: 110, image: deserts },
    { name: "Jalebi", Price: 90, image: deserts },
    { name: "Barfi", Price: 130, image: deserts },
    { name: "Laddu", Price: 80, image: deserts },
    { name: "Halwa", Price: 110, image: deserts },
    { name: "Cake", Price: 150, image: deserts },
    { name: "Brownie", Price: 160, image: deserts },
    { name: "Ice Cream", Price: 140, image: deserts },
    { name: "Mousse", Price: 170, image: deserts },
    { name: "Custard", Price: 120, image: deserts },
    { name: "Fruit Salad", Price: 100, image: deserts },
    { name: "Sponge Cake", Price: 180, image: deserts },
    { name: "Shahi Tukda", Price: 170, image: deserts },
    { name: "Basundi", Price: 150, image: deserts },
    { name: "Modak", Price: 130, image: deserts },
    { name: "Muffin", Price: 120, image: deserts },
  ],
  Drinks: [
    { name: "Tea", Price: 30, image: drinks },
    { name: "Coffee", Price: 50, image: drinks },
    { name: "Milkshake", Price: 80, image: drinks },
    { name: "Lassi", Price: 70, image: drinks },
    { name: "Cold Coffee", Price: 90, image: drinks },
    { name: "Lemonade", Price: 60, image: drinks },
    { name: "Mocktail", Price: 120, image: drinks },
    { name: "Fruit Juice", Price: 100, image: drinks },
    { name: "Soda", Price: 40, image: drinks },
    { name: "Coconut Water", Price: 50, image: drinks },
    { name: "Buttermilk", Price: 45, image: drinks },
    { name: "Thandai", Price: 110, image: drinks },
    { name: "Sugarcane Juice", Price: 50, image: drinks },
    { name: "Falooda", Price: 130, image: drinks },
    { name: "Smoothie", Price: 120, image: drinks },
    { name: "Green Tea", Price: 70, image: drinks },
    { name: "Herbal Tea", Price: 80, image: drinks },
    { name: "Masala Chai", Price: 40, image: drinks },
  ],
  Punjabi: [
    { name: "Chole Bhature", Price: 150, image: punjabi },
    { name: "Dal Makhani", Price: 130, image: punjabi },
    { name: "Butter Chicken", Price: 200, image: punjabi },
    { name: "Paneer Tikka", Price: 180, image: punjabi },
    { name: "Amritsari Kulcha", Price: 140, image: punjabi },
    { name: "Sarson da Saag & Makki di Roti", Price: 160, image: punjabi },
    { name: "Rajma Chawal", Price: 120, image: punjabi },
    { name: "Tandoori Chicken", Price: 250, image: punjabi },
    { name: "Kadai Paneer", Price: 180, image: punjabi },
    { name: "Punjabi Kadhi Pakora", Price: 110, image: punjabi },
    { name: "Stuffed Paratha", Price: 90, image: punjabi },
    { name: "Chicken Tikka Masala", Price: 220, image: punjabi },
    { name: "Mutton Rogan Josh", Price: 260, image: punjabi },
    { name: "Pindi Chana", Price: 130, image: punjabi },
    { name: "Aloo Puri", Price: 100, image: punjabi },
    { name: "Lassi", Price: 70, image: punjabi },
    { name: "Besan Ladoo", Price: 110, image: punjabi },
    { name: "Gajar ka Halwa", Price: 120, image: punjabi },
  ],
  Maharashtrian: [
    { name: "Pav Bhaji", Price: 140, image: maharashtrian },
    { name: "Vada Pav", Price: 50, image: maharashtrian },
    { name: "Misal Pav", Price: 120, image: maharashtrian },
    { name: "Puran Poli", Price: 130, image: maharashtrian },
    { name: "Thalipeeth", Price: 100, image: maharashtrian },
    { name: "Bhakarwadi", Price: 90, image: maharashtrian },
    { name: "Kanda Poha", Price: 80, image: maharashtrian },
    { name: "Zunka Bhakri", Price: 110, image: maharashtrian },
    { name: "Sabudana Khichdi", Price: 130, image: maharashtrian },
    { name: "Batata Vada", Price: 90, image: maharashtrian },
    { name: "Ukadiche Modak", Price: 150, image: maharashtrian },
    { name: "Sol Kadhi", Price: 70, image: maharashtrian },
    { name: "Bombil Fry", Price: 180, image: maharashtrian },
    { name: "Maharashtrian Pithla", Price: 120, image: maharashtrian },
    { name: "Kharvas", Price: 130, image: maharashtrian },
    { name: "Ragda Pattice", Price: 110, image: maharashtrian },
    { name: "Kolhapuri Chicken", Price: 250, image: maharashtrian },
    { name: "Shrikhand", Price: 140, image: maharashtrian },
  ],
  Gujarati: [
    { name: "Dhokla", Price: 100, image: gujarati },
    { name: "Khandvi", Price: 90, image: gujarati },
    { name: "Thepla", Price: 80, image: gujarati },
    { name: "Handvo", Price: 110, image: gujarati },
    { name: "Undhiyu", Price: 140, image: gujarati },
    { name: "Fafda", Price: 90, image: gujarati },
    { name: "Jalebi", Price: 100, image: gujarati },
    { name: "Dal Dhokli", Price: 120, image: gujarati },
    { name: "Gujarati Kadhi", Price: 80, image: gujarati },
    { name: "Lilva Kachori", Price: 110, image: gujarati },
    { name: "Sev Tameta", Price: 130, image: gujarati },
    { name: "Bardoli Khichdi", Price: 120, image: gujarati },
    { name: "Methi Thepla", Price: 90, image: gujarati },
    { name: "Patra", Price: 110, image: gujarati },
    { name: "Mohanthal", Price: 140, image: gujarati },
    { name: "Gathiya", Price: 90, image: gujarati },
    { name: "Surti Locho", Price: 110, image: gujarati },
    { name: "Rotlo with Ringan no Olo", Price: 130, image: gujarati },
  ],
  Rajasthani: [
    { name: "Dal Baati Churma", Price: 160, image: rajasthani },
    { name: "Gatte ki Sabzi", Price: 130, image: rajasthani },
    { name: "Laal Maas", Price: 250, image: rajasthani },
    { name: "Ker Sangri", Price: 120, image: rajasthani },
    { name: "Mohan Maas", Price: 260, image: rajasthani },
    { name: "Pyaaz Kachori", Price: 100, image: rajasthani },
    { name: "Mirchi Bada", Price: 110, image: rajasthani },
    { name: "Bajre ki Roti with Lehsun Chutney", Price: 90, image: rajasthani },
    { name: "Mawa Kachori", Price: 140, image: rajasthani },
    { name: "Churma Ladoo", Price: 120, image: rajasthani },
    { name: "Malpua", Price: 130, image: rajasthani },
    { name: "Aloo Pyaaz Sabzi", Price: 110, image: rajasthani },
    { name: "Jodhpuri Mirchi Vada", Price: 100, image: rajasthani },
    { name: "Rajasthani Kadhi", Price: 90, image: rajasthani },
    { name: "Kachri ki Chutney", Price: 70, image: rajasthani },
    { name: "Rabri Ghevar", Price: 150, image: rajasthani },
    { name: "Bikaneri Bhujia", Price: 100, image: rajasthani },
    { name: "Haldi Ki Sabzi", Price: 120, image: rajasthani },
  ],
};

// Component for dish card in scrollable categories
const DishCategoryCard = ({ dish, onClick }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="dish-card"
    style={{ backgroundImage: `url(${dish.image})` }}
    onClick={() => onClick(dish.name)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
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

// Component for dish item in grid
const DishGridItem = ({ dish, quantity, onIncrease, onDecrease, onAddToCart }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="grid-item"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="dish-image">
      <img src={dish.image} alt={dish.name} loading="lazy" />
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
        className={`add-to-cart ${quantity ? 'active' : ''}`}
        onClick={() => onAddToCart(dish)}
        disabled={!quantity}
      >
        {quantity ? 'Add to Cart' : 'Select Quantity'}
      </button>
    </div>
  </motion.div>
);

// Search Component
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="white"
          d="M21.53 20.47l-5.42-5.42A7.92 7.92 0 0018 10a8 8 0 10-8 8 7.92 7.92 0 005.05-1.89l5.42 5.42a1 1 0 001.41-1.41zM10 16a6 6 0 116-6 6 6 0 01-6 6z"
        />
      </svg>
    </button>
  </div>
);

// Main Menu Component
function Menu({ cart, setCart }) {
  const scrollRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDish, setSelectedDish] = useState(null);
  const [quantities, setQuantities] = useState({});

  // Combine all dishes
  const allDishes = useMemo(() => [
    ...dishes,
    ...bestDishes,
    ...Object.values(subcategoryDishes).flat(),
  ], []);  // Empty array since these are assumed to be imported constants

  // Filter dishes based on search - memoized for performance
  const filteredDishes = useMemo(() => 
    allDishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [allDishes, searchTerm]
  );

  // Quantity management handlers
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

  // Add to cart with animation
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
      
      // Reset quantity after adding to cart
      setQuantities((prev) => ({ ...prev, [dish.name]: 0 }));
      
      // Optional: Show success notification
      // showNotification(`${dish.name} added to cart!`);
    }
  }, [quantities, setCart]);

  // Handle category selection
  const handleCategorySelect = useCallback((dishName) => {
    setSelectedDish(dishName);
    // Scroll to top when selecting a category
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="menu-title">Our Menu</h1>
        <p className="menu-subtitle">Discover our delicious offerings</p>
      </div>

      {/* Search Box */}
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Content Display Logic */}
      {searchTerm ? (
        <motion.div 
          className="grid-wrapper search-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="grid-title">
            {filteredDishes.length > 0 ? 'Search Results' : 'No Results Found'}
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
        // Show Subcategory Dishes
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
        <>
          {/* Scrollable Dish Categories */}
          <section aria-labelledby="categories-heading">
            <h2 id="categories-heading" className="section-title">Categories</h2>
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
              
              {/* Optional scroll buttons for better UX */}
              <button 
                className="scroll-button left" 
                onClick={() => {
                  scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                aria-label="Scroll left"
              >
                ‹
              </button>
              <button 
                className="scroll-button right" 
                onClick={() => {
                  scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>
          </section>

          {/* Popular Dishes Section */}
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
                  dish={{...dish, isPopular: true}}
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
