import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import { supabase } from "../supabaseClient";
import ProfilePage from "./ProfilePage";
import Orders from "./Orders";
import "./AccountPage.css";

const AccountPage = () => {
  const { user, setUser } = useAuth();
  const [currentView, setCurrentView] = useState("account"); // "account", "profile", or "orders"

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (currentView === "profile") {
    return <ProfilePage onBack={() => setCurrentView("account")} />;
  }

  if (currentView === "orders") {
    return <Orders onBack={() => setCurrentView("account")} />;
  }

  return (
    <div className="account-container">
      <h2>
        Hello, {user?.user_metadata?.full_name || user?.email || "Guest"}
      </h2>
      <div className="account-buttons">
        <button onClick={() => setCurrentView("profile")}>My Profile</button>
        <button onClick={() => setCurrentView("orders")}>My Orders</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AccountPage;
