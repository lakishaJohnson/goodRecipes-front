import React from "react";
import { useLocation } from "react-router-dom";

function SearchResultsPage() {
  const location = useLocation();
  const searchResults =
    location.state && location.state.searchResults
      ? location.state.searchResults
      : [];

  return (
    <div>
      <h2>Search Results:</h2>
      <ul>
        {searchResults.map((result) => (
          <li key={result.recipe.uri}>
            <a href={result.recipe.url} target="_blank" rel="noopener noreferrer">
              {result.recipe.label}
              {/* <img
                src={result.recipe.image}
                alt={result.recipe.label}
                style={{ maxWidth: "50px" }}
              /> */}
            {/* </Link> */}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResultsPage;
