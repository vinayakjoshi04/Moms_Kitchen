import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthProvider";
import "./Orders.css";

function Orders({ onBack }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch orders from Supabase for the current user.
  useEffect(() => {
    async function fetchOrders() {
      if (!user) return; // Ensure we have a valid user

      // Query the orders table for orders with user_id equal to the current user id.
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }
      setIsLoading(false);
    }

    fetchOrders();
  }, [user]);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order #{order.id}</h3>
            <p>
              <strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Total:</strong> ₹{Number(order.total).toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <div className="order-items">
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} (x{item.quantity}) - ₹{Number(item.Price).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
      <br /><br /><br />
      <button onClick={onBack} className="back-button">
        Back to Account
    </button>
    </div>
  );
}

export default Orders;
