import React, { useState } from "react";
import { useAuth } from "../AuthProvider";  // Or wherever your Auth context is
import { supabase } from "../supabaseClient"; // Import your supabase client
import "./ProfilePage.css";

function ProfilePage({ onBack }) {
  const { user, setUser } = useAuth();

  // We'll track "editMode" to toggle between displaying / editing
  const [editMode, setEditMode] = useState(false);

  // Initialize with current user data
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "");
  const [email] = useState(user?.email || "");

  // For showing any error from supabase
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async () => {
    setErrorMessage("");
    try {
      // Attempt to update the user's auth metadata
      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      });
      if (error) {
        throw error;
      }

      // `data.user` is the updated user object
      // Update your local context to reflect the new user info
      setUser(data.user);

      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrorMessage(err.message || "Failed to update profile");
    }
  };

  return (
    <div className="profile-container">

      <h2>My Profile</h2>

      {editMode ? (
        <div className="profile-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} disabled />
          </div>

          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}

          <div className="form-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="profile-info">
          <p>
            <strong>Full Name:</strong> {fullName || "Not set"}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
      <br /><br /><br />
      <button onClick={onBack} className="back-button">
        Back to Account
      </button>
    </div>
  );
}

export default ProfilePage;
