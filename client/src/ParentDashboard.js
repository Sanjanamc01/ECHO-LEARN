import React from "react";
import "./style.css";

// 3: ParentDashboard receives onLogout function from App
function ParentDashboard({ onLogout }) {
  return (
    <div className="container">
      <h1 className="title">Dashboard</h1>

      <p>Child progress and reports will be shown here (to be implemented).</p>

      {/* 10: Logout button → back to login page */}
      <button className="btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default ParentDashboard;
