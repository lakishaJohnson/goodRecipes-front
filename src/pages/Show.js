import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../Show.css";

function Show() {
  const [recipe, setRecipes] = useState([]);
  const API = process.env.REACT_APP_API_URL;
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/recipes/${id}`)
      .then((response) => {
        // console.log(response.data);
        setRecipes(response.data);
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
            navigate(`/recipes`);
          },
          (error) => console.error(error)
        )
        .catch((c) => console.warn("catch", c));
    }
  };

  const formatInterval = (interval) => {
    const minutes = parseInt(interval, 10);

    if (!isNaN(minutes)) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      if (hours > 0) {
        return `${hours}h ${remainingMinutes}min`;
      } else {
        return `${remainingMinutes}min`;
      }
    }

    return "";
  };

  return (
    <div>
      <article className="article">
        <div className="favorite">
          <h3>
            {recipe.is_good ? <span>❤️</span> : null} Dish: {recipe.dish}
          </h3>
        </div>
        <h5>Ingredients: {recipe.ingredients}</h5>
        <p>Prep time: {formatInterval(recipe.preptime)}</p>
        <p>Cook time: {formatInterval(recipe.cooktime)}</p>
        <p>Total time: {formatInterval(recipe.totaltime)}</p>
        <p>Cooking instructions: {recipe.directions}</p>
        <p>Nutrition: {recipe.nutritionfacts}</p>
        <p>Tips: {recipe.tips}</p>
      </article>
        <div>
          <Link to={`/recipes`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          <Link to={`/recipes/${id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          <button onClick={deleteRecipe}>Delete</button>
        </div>
    </div>
  );
}

export default Show;
