import React from "react";
import Hero from "../components/Hero";
import Sidebar from "../components/SideBar";
import "../Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <Hero />
      </div>
      <Sidebar />
    </div>
  );
}

export default Home;
