import React from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
const Home = () => {
  return (
    <>
      <div className="hero">
        <div className="sidekick">
          <Header />
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Home;
