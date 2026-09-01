import React, { useState } from "react";
import "./style.css";

// props:
// onLoginSuccess → called when backend says login is correct
// onBack         → go back to main login screen
function ParentLogin({ onLoginSuccess, onBack }) {
  const [parentName, setParentName] = useState("");
  const [parentPassword, setParentPassword] = useState("");

 const handleParentLogin = async () => {
  if (!parentName || !parentPassword) {
    alert("Please enter parent name and password.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/login-parent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parentName, parentPassword }),
    });

    const text = await response.text();    // DEBUG
    console.log("Parent login raw response:", response.status, text);

    let data;
    try { data = JSON.parse(text); } 
    catch { data = { message: text }; }

    if (!response.ok) {
      alert(data.message || "Parent login failed");
      return;
    }

    alert("Parent login successful");
    onLoginSuccess(); // move to parent dashboard
  } catch (err) {
    console.error("Parent login error:", err);
    alert("Something went wrong during parent login.");
  }
};


  return (
    <div className="container">
      <h2 className="title">Parent Login</h2>

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

      <button className="btn" onClick={handleParentLogin}>
        Login
      </button>

      <p className="link" onClick={onBack}>
        Back
      </p>
    </div>
  );
}

export default ParentLogin;
