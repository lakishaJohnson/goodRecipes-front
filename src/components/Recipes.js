import axios from "axios";
import { useState, useEffect } from "react";
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
        const response1 = await axios.get(`${API}/recipes`, {
          params: {
            is_good: booleanParam,
          },
        });
        const response2 = await axios.get(`${API}/quick_recipes`, {
          params: {
            is_good: booleanParam,
          },
        });

        const combinedRecipes = [...response1.data, ...response2.data];
        setRecipes(combinedRecipes);
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
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <div className="card">
                  <div
                    className="recipe-image card-img-top"
                    style={{ backgroundImage: `url(${recipe.image_url})` }}
                  ></div>
                  <div className="card-body">
                    <h3 className="recipe-title card-title">{recipe.dish}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipes;
