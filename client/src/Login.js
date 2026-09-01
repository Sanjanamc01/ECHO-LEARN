import React from "react";
import "./style.css";

function Login({ onParentLoginClick, onChildLoginClick, onGoToCreateAccount }) {
  return (
    <div className="container">
      <h1 className="title">NUDI</h1>

      <button className="btn" onClick={onParentLoginClick}>
        Login as Parent
      </button>

      <button className="btn" onClick={onChildLoginClick}>
        Login as Child
      </button>

      <p className="link" onClick={onGoToCreateAccount}>
        Create Account
      </p>
    </div>
  );
}

export default Login;
