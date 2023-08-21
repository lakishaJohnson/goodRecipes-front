import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Breakfast() {
  const { category } = useParams();

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchBreakfast(category);
  }, [category]);

  const fetchBreakfast = async () => {
    try {
      const response = await axios.get(`${API}/recipes`, {
        params: {
          category: "Breakfast",
        },
      });
      setRecipes(response.data);
      //   console.log(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchBreakfast();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", fontFamily: "Courgette", fontSize: "54px" }}>Breakfast</h2>
      <div className="row" style={{ margin: "30px", padding: "10px" }}>
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-3">
            <div className="card h-100" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src={recipe.image_url}
                alt={recipe.dish}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{recipe.dish}</h5>
                <a
                  href={`/recipe/${recipe.id}`}
                  className="btn btn-primary mt-auto"
                >
                  View Recipe
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
