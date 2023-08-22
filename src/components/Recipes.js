import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

import "../Recipes.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const API = process.env.REACT_APP_API_URL;

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const queryParams = useQuery();
  const booleanParam = queryParams.get("is_good");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${API}/recipes`, {
          params: {
            is_good: booleanParam,
          },
        });
        setRecipes(response.data);
        console.log(response.data);
      } catch (error) {
        console.warn("catch", error);
      }
    };
    fetchRecipes();
  }, [booleanParam]);

  return (
    <div>
      <div className="container">
        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4 mb-4">
        <div className="card">
                <Link to={`/recipes/${recipe.id}`} className="recipe-link">
                  <div
                    className="recipe-image card-img-top"
                    style={{ backgroundImage: `url(${recipe.image_url})` }}
                  ></div>
                  <div className="card-body">
                    <h3 className="recipe-title card-title">{recipe.dish}</h3>
                  </div>
                </Link>
                <p
                  className="recipe-good"
                  style={{ position: "absolute", right: "10px", top: "10px" }}
                >
                  {recipe.is_good ? (
                    <span
                      role="img"
                      aria-label="Good Recipe"
                      style={{ fontSize: "22px" }}
                    >
                      ❤️
                    </span>
                  ) : (
                    <span role="img" aria-label="Not Good Recipe">
                      ❌
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipes;
