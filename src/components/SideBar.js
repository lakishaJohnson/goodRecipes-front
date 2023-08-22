import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const [recipes, setRecipes] = useState([]);

  const API = process.env.REACT_APP_API_URL;
  console.log(API);

  useEffect(() => {
    async function fetchQuickRecipes() {
      try {
        const response = await axios.get(`${API}/recipes`);
        const quickRecipes = response.data.filter((recipe) => recipe.is_quick);
        setRecipes(quickRecipes);
        // console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuickRecipes();
  }, [API]);

  return (
    <div className="sidebar">
      <h2 style={{ fontFamily: "Courgette", marginBottom: "40px", textAlign: "center" }}>
        Quick & Easy Recipes
      </h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} style={{ marginBottom: "20px" }}>
            <Link
              to={`/recipes/${recipe.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {recipe.dish}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/recipes" className="view-more">
        View more recipes...
      </Link>
    </div>
  );
}

export default Sidebar;
