import React from "react";
import { Link } from "react-router-dom";
import "../NavBar.css";

export default function NavBar() {

  const navigateToHome = () => {
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
          <button className="dropbtn">Categories</button>
          <div className="dropdown-content">
            <Link to="/breakfast">Breakfast</Link>
            <Link to="/lunch">Lunch</Link>
            <Link to="/dinner">Dinner</Link>
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
