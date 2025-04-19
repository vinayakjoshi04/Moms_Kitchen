// src/components/Dashboard.jsx
import React, { useState } from "react";
import DishForm from "./DishForm";
import DishList from "./DishList";
import { PlusIcon } from "@heroicons/react/24/outline";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ dishes, addDish, updateDish, deleteDish }) {
  const [showForm, setShowForm] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

  // Calculate statistics
  const totalDishes = dishes.length;
  const avgPrice = totalDishes ? (dishes.reduce((sum, d) => sum + Number(d.price), 0) / totalDishes).toFixed(2) : 0;
  const categories = {};
  dishes.forEach(dish => {
    const category = dish.category || 'Uncategorized';
    categories[category] = (categories[category] || 0) + 1;
  });

  // Format data for charts
  const categoryData = Object.keys(categories).map(cat => ({
    name: cat,
    count: categories[cat]
  }));

  return (
    <div className="space-y-8">
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Total Dishes</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalDishes}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Average Price</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹{avgPrice}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Categories</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{Object.keys(categories).length}</p>
        </div>
      </div>

      {/* Chart Section */}
      {totalDishes > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Menu Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }} 
                />
                <Bar dataKey="count" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Add Dish Button */}
      <div className="flex justify-end">
        <button 
          onClick={() => { setShowForm(true); setEditingDish(null); }}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Dish Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-opacity-50 bg-[rgba(46,44,44,0.850)] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingDish ? 'Edit Dish' : 'Add New Dish'}
              </h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                &times;
              </button>
            </div>
            <DishForm 
              onSubmit={(dish) => {
                editingDish ? updateDish(dish) : addDish(dish);
                setShowForm(false);
              }}
              initialData={editingDish}
            />
          </div>
        </div>
      )}

      {/* Dish List */}
      <DishList 
        dishes={dishes} 
        onEdit={(dish) => {
          setEditingDish(dish);
          setShowForm(true);
        }}
        onDelete={deleteDish}
      />
    </div>
  );
}
