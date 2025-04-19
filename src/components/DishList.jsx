// src/components/DishList.jsx
import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';

export default function DishList({ dishes, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Get unique categories
  const categories = ['All', ...new Set(dishes.map(dish => dish.category || 'Uncategorized'))];
  
  // Filter dishes
  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dish.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || selectedCategory === '' || 
                           (dish.category || 'Uncategorized') === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (dishes.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-gray-500 dark:text-gray-400">No dishes added yet. Add your first dish to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              category !== 'All' && <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDishes.map(dish => (
          <div 
            key={dish.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {dish.image && (
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="object-cover w-full h-48"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x150?text=No+Image';
                  }}
                />
              </div>
            )}
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{dish.name}</h3>
                  {dish.category && (
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full mt-1">
                      {dish.category}
                    </span>
                  )}
                </div>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">₹{dish.price}</span>
              </div>
              
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{dish.description}</p>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => onEdit(dish)}
                  className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  title="Edit"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(dish.id)}
                  className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  title="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
