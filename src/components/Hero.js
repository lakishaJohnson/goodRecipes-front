import React from "react";
import { Link } from "react-router-dom";
import "../Home.css";

function Hero() {
  return (
    <div>
      <div className="hero"></div>
      <p className="centered-text">
        {" "}
        So long as you have food in your mouth you have solved all questions for
        the time being.
      </p>
      <Link to="/recipes" className="view-more">
        View more recipes...
      </Link>
    </div>
  );
}

export default Hero;
