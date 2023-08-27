import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Edit.css";

function NewRecipe() {
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

  const images = [
    "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
    "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2023/02/foods_cause_cancer_Hot_dogs_732x549_thumb.jpg",
    "https://images.nationalgeographic.org/image/upload/v1638890193/EducationHub/photos/mithai.jpg",
    "https://hips.hearstapps.com/hmg-prod/images/20190503-delish-pineapple-baked-salmon-horizontal-ehg-450-1557771120.jpg?resize=1200:*",
  ];
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    console.log(randomIndex);
    return images[randomIndex];
  };

  useEffect(() => {
    if (!recipe.image_url) {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        image_url: getRandomImage(),
      }));
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Recipe Object:", recipe);
    axios
      .post(`${API}/recipes`, recipe)
      .then((response) => {
        navigate(`/recipes/${response.data.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
              placeholder="Spaghetti Sauce"
              onChange={handleTextChange}
              required
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
            <label htmlFor="is_quick" className="label">
              Is Quick:
            </label>
            <input
              id="is_quick"
              type="checkbox"
              checked={recipe.is_quick}
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
              placeholder="Dinner"
              onChange={handleTextChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients" className="label">
              Ingredients:
            </label>
            <textarea
              id="ingredients"
              value={recipe.ingredients}
              placeholder="onions, tomato sauce, etc."
              onChange={handleTextChange}
              required
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
              placeholder="2 minutes"
              onChange={handleTextChange}
              required
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
              placeholder="1 hour 15 minutes"
              onChange={handleTextChange}
              required
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
              placeholder="1 hour 17 minutes"
              onChange={handleTextChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="directions" className="label">
              Cooking Directions:
            </label>
            <textarea
              id="directions"
              value={recipe.directions}
              placeholder="Step 1:....,"
              onChange={handleTextChange}
              required
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
              value={recipe.tips}
              placeholder="Add beef"
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
            <strong>Create Recipe</strong>
          </button>
          <Link to={`/recipes`}>
            <button>Cancel</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default NewRecipe;
