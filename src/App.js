import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Index from "./pages/Index";
import Show from "./pages/Show";
import Edit from "./pages/Edit";

import NavBar from "./components/NavBar";
import Breakfast from "./components/Breakfast";
import Lunch from "./components/Lunch";
import Dinner from "./components/Dinner";
import NewRecipe from "./components/NewRecipe";
import SearchResultsPage from "./components/SearchResultsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Index />} />
          <Route path="/recipes/:id" element={<Show />} />
          <Route path="/recipes/:id/edit" element={<Edit />} />
          <Route path="/recipes/:id/new" element={<NewRecipe />} />
          <Route path="/breakfast" Component={Breakfast} />
          <Route path="/lunch" Component={Lunch} />
          <Route path="/dinner" Component={Dinner} />
          <Route path="/search-results" Component={SearchResultsPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
