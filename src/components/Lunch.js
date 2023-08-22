import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Lunch() {
  const { category } = useParams();

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchLunch(category);
  }, [category]);

  const fetchLunch = async () => {
    try {
      const response = await axios.get(`${API}/recipes`, {
        params: {
          category: "Lunch",
        },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          fontFamily: "Courgette",
          fontSize: "54px",
          marginTop: "20px",
        }}
      >
        Lunch
      </h2>
      <div
        className="row"
        style={{
          margin: "30px",
          padding: "10px",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-3">
            <div className="card h-100" style={{ width: "20rem" }}>
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
  );
}
