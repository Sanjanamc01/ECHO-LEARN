import React from "react";
import "./aac.css";

// This is ONE tile (category) block on AAC home screen
// We pass: title, image, and onClick handler from parent
function CategoryCard({ title, image, onClick }) {
  return (
    <div className="category-card" onClick={onClick}>
      <img src={image} alt={title} className="category-icon" />
      <p className="category-text">{title}</p>
    </div>
  );
}

export default CategoryCard;
