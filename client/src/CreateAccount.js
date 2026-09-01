import React, { useState } from "react";
import "./style.css";

function CreateAccount({ onBackToLogin }) {
  const [parentName, setParentName] = useState("");
  const [parentPassword, setParentPassword] = useState("");
  const [childName, setChildName] = useState("");
  const [childPassword, setChildPassword] = useState("");

  // Line 9: This function runs when "Create Account" button is clicked
  const handleCreateAccount = async () => {
    // Line 11: Prepare the data object to send to backend
    const accountData = {
      parentName,
      parentPassword,
      childName,
      childPassword,
    };

    try {
      // Line 20: Send a POST request to our backend API using fetch
      const response = await fetch("http://localhost:5000/api/create-account", {
        method: "POST", // Line 22: HTTP method is POST for sending data
        headers: {
          "Content-Type": "application/json", // Line 24: Tell backend we're sending JSON
        },
        body: JSON.stringify(accountData), // Line 26: Convert JS object to JSON string
      });

      // Line 29: Convert backend response body (JSON) to JS object
      const data = await response.json();

      // Line 32: If response is not ok (status code not 2xx), show error
      if (!response.ok) {
        alert("Error: " + data.message);
        return;
      }

      // Line 38: If success, show message
      alert("Account created successfully!");

      // Line 41: Optionally clear the form
      setParentName("");
      setParentPassword("");
      setChildName("");
      setChildPassword("");

      // Line 47: Optionally go back to login automatically after success
      // onBackToLogin();
    } catch (error) {
      // Line 51: If network or server error occurs
      console.error("Request failed:", error);
      alert("Something went wrong while creating account.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Create Account</h2>

      <input
        className="input"
        type="text"
        placeholder="Parent Name"
        value={parentName}
        onChange={(e) => setParentName(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Parent Password"
        value={parentPassword}
        onChange={(e) => setParentPassword(e.target.value)}
      />

      <input
        className="input"
        type="text"
        placeholder="Child Name"
        value={childName}
        onChange={(e) => setChildName(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Child Password"
        value={childPassword}
        onChange={(e) => setChildPassword(e.target.value)}
      />

      <button className="btn" onClick={handleCreateAccount}>
        Create Account
      </button>

      <p className="link" onClick={onBackToLogin}>
        Back to Login
      </p>
    </div>
  );
}

export default CreateAccount;
