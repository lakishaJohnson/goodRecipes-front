import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TwitterShareButton, TwitterIcon } from "react-share";
import "../Show.css";

function RecipeDetails() {
  const [recipe, setRecipe] = useState({});
  const API = process.env.REACT_APP_API_URL;
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  }, [id, API]);

  const deleteRecipe = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmed) {
      axios
        .delete(`${API}/recipes/${id}`)
        .then(() => {
          navigate(`/recipes`);
        })
        .catch((error) => {
          console.error("Error deleting recipe:", error);
        });
    }
  };

  const tweetContent = `${recipe.dish} - ${recipe.total_time} to make.`;

  return (
    <div className="recipe-card-container">
      <article className="recipe-card">
        <div className="favorite">
          <h1>{recipe.category}</h1>
          <h3 style={{ marginBottom: "13px", fontFamily: "Courgette" }}>
            {recipe.is_good ? <span>❤️</span> : null} {recipe.dish}
          </h3>
        </div>
        <h3 style={{ fontWeight: "bold" }}>Ingredients:</h3>
        <p style={{ fontWeight: "bold" }}>{recipe.ingredients}</p>
        <p className="time">Prep time: {recipe.prep_time}</p>
        <p className="time">Cook time: {recipe.cook_time}</p>
        <p className="time">Total time: {recipe.total_time}</p>
        <p style={{ fontWeight: "bold" }}>
          Cooking instructions: {recipe.directions}
        </p>
        <p style={{ fontWeight: "bold" }}>
          Nutrition: Per serving: {recipe.nutrition_facts}
        </p>
        <p style={{ fontWeight: "bold" }}>Tips: {recipe.tips}</p>
        <div className="share-button">
          <TwitterShareButton url={"http://www.twitter.com"} title={tweetContent}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>

        <div className="card"></div>
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
