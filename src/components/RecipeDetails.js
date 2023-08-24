import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../Show.css";

function RecipeDetails() {
  const [recipe, setRecipe] = useState([]);
  const API = process.env.REACT_APP_API_URL;
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
        console.log(response.data.prep_time);
        console.log(response.data);
      })
      .catch((c) => {
        console.warn("catch", c);
      });
  }, [id, API]);

  const deleteRecipe = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmed) {
      axios
        .delete(`${API}/recipes/${id}`)
        .then(
          () => {
            navigate(`/recipe`);
          },
          (error) => console.error(error)
        )
        .catch((c) => console.warn("catch", c));
    }
  };

  return (
    <div className="recipe-card-container">
      <article className="recipe-card">
        <div className="favorite">
          <h1>{recipe.category}</h1>
          <h3 style={{ marginBottom: "13px", fontFamily: "Courgette" }}>
            {recipe.is_good ? <span>❤️</span> : null} {recipe.dish}
          </h3>
        </div>
        <h4 style={{ fontWeight: "bold" }}>Ingredients:</h4>
        <p style={{ fontWeight: "bold" }}>{recipe.ingredients}</p>
        <p className="time">Prep time: {recipe.prep_time}</p>
        <p className="time">Cook time: {recipe.cook_time}</p>
        <p className="time">Total time: {recipe.total_time}</p>
        <p style={{ fontWeight: "bold" }}>
          Cooking instructions: {recipe.directions}
        </p>
        <p style={{ fontWeight: "bold" }}>
          Nutrition: {recipe.nutrition_facts}
        </p>
        <p style={{ fontWeight: "bold" }}>Tips: {recipe.tips}</p>
      </article>
      <div className="button-group">
        <Link to={`/recipes`}>
          <button>Back</button>
        </Link>
        <Link to={`/recipes/${id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={deleteRecipe}>Delete</button>
      </div>
    </div>
  );
}

export default RecipeDetails;
