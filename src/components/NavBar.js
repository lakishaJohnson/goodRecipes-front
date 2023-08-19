import React from "react";
import { Link } from "react-router-dom";

import "../NavBar.css";

export default function NavBar() {
  const navigateToHome = () => {
    // You can use window.location.href to navigate
    window.location.href = "/"; 
  };

  return (
    <nav className="navbar navbar-light">
      <h1>
        <Link className="recipes-app" to="/recipes">
          GoodRecipes!
        </Link>
      </h1>
      <div className="navbar-buttons">
        <button className="btn btn-primary mr-2" onClick={navigateToHome}>
          Home
        </button>
        <div className="dropdown">
          <button className="dropbtn">Dropdown</button>
          <div className="dropdown-content">
            <a href="/breakfast">Breakfast</a>
            <a href="/lunch">Lunch</a>
            <a href="/dinner">Dinner</a>
          </div>
        </div>
        <input
          type="text"
          className="form-control ml-2 search"
          placeholder="Search..."
        />
      </div>
    </nav>
  );
}
