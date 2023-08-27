import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../NavBar.css";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const apiKey = "00a76f0af9mshc451310958bee40p189b51jsn112c7696ae78";
  const navigate = useNavigate();

  const navigateToHome = () => {
    window.location.href = "/";
  };

  const handleSearch = async () => {
    const options = {
      method: "GET",
      url: "https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2",
      params: {
        type: "public",
        co2EmissionsClass: "A+",
        "field[0]": "uri",
        q: "chicken",
        beta: "true",
        random: "true",
        "cuisineType[0]": "American",
        "imageSize[0]": "LARGE",
        "mealType[0]": "Breakfast",
        "health[0]": "alcohol-cocktail",
        "diet[0]": "balanced",
        "dishType[0]": "Biscuits and cookies",
      },
      headers: {
        "Accept-Language": "en",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
      },
    };

    try {
      options.params.q = search;
      const response = await axios.request(options);
      navigate("/search-results", {
        state: { searchResults: response.data.hits },
      });
      setSearch("");
    } catch (error) {
      console.error(error);
    }
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
            <Link to="/recipes/:id/new">New</Link>
          </div>
        </div>
        <input
          type="text"
          className="form-control ml-2 search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
    </nav>
  );
}
