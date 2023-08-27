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
  const quickParam = queryParams.get("is_quick");

  // const toggleIsGood = async (recipeId) => {
  //   try {
  //     const response = await axios.put(`${API}/recipes/${recipeId}`, {
  //       is_good: !recipes.find((recipe) => recipe.id === recipeId).is_good,
  //     });

  //     setRecipes((prevRecipes) =>
  //       prevRecipes.map((recipe) =>
  //         recipe.id === recipeId ? response.data : recipe
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error toggling is_good:", error);
  //   }
  // };
  const toggleIsGood = (recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === recipeId
          ? { ...recipe, is_good: !recipe.is_good }
          : recipe
      )
    );
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${API}/recipes`, {
          params: {
            is_quick: quickParam,
            is_good: booleanParam,
          },
        });
        setRecipes(response.data);
        // console.log(response.data);
      } catch (error) {
        console.warn("catch", error);
      }
    };
    fetchRecipes();
  }, [booleanParam, quickParam]);

  return (
    <div>
      <div className="container">
        <div className="row g-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4">
              <div className="card" style={{ height: "26rem" }}>
                <Link to={`/recipes/${recipe.id}`} className="recipe-link">
                  <div
                    className="recipe-image card-img-top"
                    style={{ backgroundImage: `url(${recipe.image_url})` }}
                  ></div>
                  <div className="card-body">
                    <h3 className="recipe-title card-title">{recipe.dish}</h3>
                    <p>Per serving: {recipe.nutrition_facts} calories</p>
                    <p style={{ fontWeight: "bold" }}>
                      Is Quick: {recipe.is_quick ? "Yes" : "No"}
                    </p>
                  </div>
                </Link>
                <p
                  className="recipe-good"
                  style={{ position: "absolute", right: "10px", top: "10px" }}
                  onClick={() => toggleIsGood(recipe.id)}
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
