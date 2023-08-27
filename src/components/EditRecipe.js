import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Edit.css";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const [recipe, setRecipe] = useState({
    dish: "",
    category: "",
    ingredients: "",
    prep_time: "",
    cook_time: "",
    total_time: "",
    directions: "",
    nutrition_facts: 0,
    tips: "",
    is_good: false,
    is_quick: false,
    image_url: "",
  });

  const handleTextChange = (event) => {
    const { id, value } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [id]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${API}/recipes/${id}`, recipe)
      .then((response) => {
        setRecipe(response.data);
        navigate(`/recipes/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${API}/recipes/${id}`)
      .then((response) => {
        // console.log(response.data.cooktime);
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, navigate, API]);

  return (
    <div className="EditRecipe">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="jumbotron">
          <div className="form-group">
            <label htmlFor="dish" className="label">
              Dish Name:
            </label>
            <input
              id="dish"
              type="text"
              value={recipe.dish}
              onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="is_good" className="label">
              Is Good:
            </label>
            <input
              id="is_good"
              type="checkbox"
              checked={recipe.is_good}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="label">
              Category:
            </label>
            <input
              id="category"
              type="text"
              value={recipe.category}
              onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients" className="label">
              Ingredients:
            </label>
            <textarea
              id="ingredients"
              value={recipe.ingredients || ""}
              onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="prep_time" className="label">
              Prep Time:
            </label>
            <input
              id="prep_time"
              type="text"
              value={recipe.prep_time}
              onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cook_time" className="label">
              Cook Time:
            </label>
            <input
              id="cook_time"
              type="text"
              value={recipe.cook_time}
              onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="total_time" className="label">
              Total Time:
            </label>
            <input
              id="total_time"
              type="text"
              value={recipe.total_time}
              onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="directions" className="label">
              Cooking Directions:
            </label>
            <textarea
              id="directions"
              value={recipe.directions || ""}
              onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nutrition_facts" className="label">
              Number of calories:
            </label>
            <input
              id="nutrition_facts"
              type="number"
              value={recipe.nutrition_facts}
              placeholder="260"
              onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tips" className="label">
              Tips:
            </label>
            <textarea
              id="tips"
              value={recipe.tips || ""} 
              onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image_url" className="label">
              Image URL:
            </label>
            <input
              id="image_url"
              type="url"
              value={recipe.image_url}
              onChange={handleTextChange}
            />
          </div>
          <br />
          <button type="submit" className="submit-button">
            <strong>Update Recipe</strong>
          </button>
          <Link to={`/recipes/${id}`}>
            <button>Sike!!</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditRecipe;
