# 🍽️ Food Delivery Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)](https://leafletjs.com/)

A comprehensive food delivery application that allows users to browse restaurants, select dishes, place orders, and track delivery in real-time with intuitive user interface and robust backend functionality.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)
- [Screenshots](#screenshots)
- [Future Roadmap](#future-roadmap)

## 🌟 Overview

This food delivery platform provides a complete solution for online food ordering with real-time delivery tracking. The application features a user-friendly interface, secure authentication system, interactive menu browsing, and seamless order management capabilities.

## ✨ Features

### Intuitive User Interface
- Modern, responsive design for all devices
- Clear visual hierarchy and intuitive navigation
- Consistent header and footer across all pages

### Comprehensive Menu System
- Horizontal scrolling menu categories
- Featured dishes and customer favorites
- Detailed food descriptions with high-quality images

### Secure Authentication
- Multiple login options:
  - Email/password registration
  - Google and Facebook OAuth integration
  - Phone number verification with OTP

### Seamless Ordering Process
- Interactive cart management
- Address selection/input
- Payment processing
- Order confirmation
- Real-time delivery tracking with maps

### User Profile Management
- Order history tracking
- Saved addresses
- Payment method management
- User preferences

### Restaurant Owner Dashboard
- Full CRUD operations for menu management
- Data visualization with interactive bar charts
- Real-time search and advanced filtering options
- Clean, responsive, and intuitive UI

## 🛠️ Tech Stack

### Frontend
- React.js for component-based UI development
- Responsive CSS framework
- Modern JavaScript ES6+

### Backend
- Supabase for authentication and database
- RESTful API architecture
- Leaflet for maps integration

### Security
- OAuth 2.0 implementation
- Secure token management
- Data encryption

```bash
## 📥 Installation

# Clone the repository
git clone https://github.com/vinayakjoshi04/Moms_Kitchen.git

# Navigate to the project directory
cd Moms_Kitchen

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Edit the .env file with your Supabase credentials

# Start the development server
npm start
```

## 🚀 Usage

1. Register or log in using your preferred authentication method
2. Browse restaurants and menu items by category
3. Add desired items to your cart
4. Proceed to checkout and enter delivery details
5. Complete payment process
6. Track your order in real-time on the map
7. View order history in your profile

## 📸 Screenshots

### Home Page
![Home Page Hero Section](https://github.com/user-attachments/assets/82a89125-7c4c-4b1f-8654-5638bee41a3f)
![Featured Categories](https://github.com/user-attachments/assets/77b259d5-465d-4226-a0d9-dd0fdcdcc1f4)
![Popular Restaurants](https://github.com/user-attachments/assets/7700875c-4dcc-4701-9af4-61b40d26c4ea)

### Menu Page
![Cuisine Categories](https://github.com/user-attachments/assets/1c69fa7e-4ea4-4444-9f59-80088b342d79)
![Customer Favorites](https://github.com/user-attachments/assets/31878ebf-ca34-4f5c-88df-3357c95ef640)

### Authentication & Orders
![Login Options](https://github.com/user-attachments/assets/acd5644d-2d5c-4bb8-94e6-1be55ada4a55)
![Shopping Cart](https://github.com/user-attachments/assets/b4aa5803-c964-4455-87ed-64036186aa8e)
![Real-time Map Tracking](https://github.com/user-attachments/assets/14e899c1-40ba-4ce9-99d9-8f6641a7559a)

### User Profile
![Profile Overview](https://github.com/user-attachments/assets/a4686aeb-6449-4b81-97a7-3710be86377a)

## 🔮 Future Roadmap

- Integration with additional payment gateways
- Implementation of a loyalty program
- Restaurant partner portal
- Advanced search and filtering options
- Personalized recommendations based on order history
- Scheduled delivery options
