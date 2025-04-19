// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import localforage from 'localforage';

export default function DashboardPage() {
  const [dishes, setDishes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved dishes
    localforage.getItem('dishes').then(storedDishes => {
      if (storedDishes) setDishes(storedDishes);
    });
    
    // Check dark mode preference
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // CRUD operations
  const addDish = (dish) => {
    const newDishes = [...dishes, {...dish, id: Date.now()}];
    setDishes(newDishes);
    localforage.setItem('dishes', newDishes);
  };

  const updateDish = (updatedDish) => {
    const newDishes = dishes.map(d => d.id === updatedDish.id ? updatedDish : d);
    setDishes(newDishes);
    localforage.setItem('dishes', newDishes);
  };

  const deleteDish = (id) => {
    const newDishes = dishes.filter(d => d.id !== id);
    setDishes(newDishes);
    localforage.setItem('dishes', newDishes);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Restaurant Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Logout
            </button>
          </div>
        </div>
        
        <Dashboard
          dishes={dishes}
          addDish={addDish}
          updateDish={updateDish}
          deleteDish={deleteDish}
        />
      </div>
    </div>
  );
}
