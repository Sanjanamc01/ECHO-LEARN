import React, { useState } from "react";
import "./style.css";

// props:
// onLoginSuccess → called when backend says login is correct
// onBack         → back to main login menu
function ChildLogin({ onLoginSuccess, onBack }) {
  const [childName, setChildName] = useState("");
  const [childPassword, setChildPassword] = useState("");

  const handleChildLogin = async () => {
  if (!childName || !childPassword) {
    alert("Please enter child name and password.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/login-child", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ childName, childPassword }),
    });

    const text = await response.text();    // DEBUG
    console.log("Child login raw response:", response.status, text);

    let data;
    try { data = JSON.parse(text); }
    catch { data = { message: text }; }

    if (!response.ok) {
      alert(data.message || "Child login failed");
      return;
    }

    alert("Child login successful");
    onLoginSuccess(data.childId); // move to AAC board
  } catch (err) {
    console.error("Child login error:", err);
    alert("Something went wrong during child login.");
  }
};

  return (
    <div className="container">
      <h2 className="title">Child Login</h2>

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

      <button className="btn" onClick={handleChildLogin}>
        Login
      </button>

      <p className="link" onClick={onBack}>
        Back
      </p>
    </div>
  );
}

export default ChildLogin;
