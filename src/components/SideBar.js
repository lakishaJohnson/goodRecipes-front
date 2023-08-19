import React, { useState, useEffect } from "react";
import axios from "axios";

function Sidebar() {
  const [quickRecipes, setQuickRecipes] = useState([]);

  const API = process.env.REACT_APP_API_URL;
  console.log(API);

  useEffect(() => {
    async function fetchQuickRecipes() {
      try {
        const response = await axios.get(`${API}/quick_recipes`);
        setQuickRecipes(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuickRecipes();
  }, [API]);

  return (
    <div className="sidebar">
      <h2 style={{fontFamily: "Courgette", marginBottom: "40px"}}>Quick & Easy Recipes</h2>
      <ul>
        {quickRecipes.map((recipe) => (
          <li key={recipe.id} style={{marginBottom: "40px"}}>{recipe.dish}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
