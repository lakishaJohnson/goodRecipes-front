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
      <h2
        style={{
          textAlign: "center",
          fontFamily: "Courgette",
          fontSize: "54px",
          marginTop: "20px",
        }}
      >
        Breakfast
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
              <a href={`/recipes/${recipe.id}`}>
                <img
                  className="card-img-top"
                  src={recipe.image_url}
                  alt={recipe.dish}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </a>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title" style={{ fontFamily: "Courgette" }}>
                  {recipe.dish}
                </h5>
                <p>{recipe.nutrition_facts}</p>
                <a
                  href={`/recipes/${recipe.id}`}
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
