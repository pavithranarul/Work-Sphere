import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="homepage-content">
        <h1>Welcome to WorkSphere</h1>
        <p>
          A collest system for managing the data among the employees.
        </p>
        <div className="homepage-buttons">
          <button onClick={() => navigate("/")} className="btn-primary">
            Home
          </button>
          <button onClick={() => navigate("/add")} className="btn-primary">
            Add Employee
          </button>
          <button
            onClick={() => navigate("/employees")}
            className="btn-primary"
          >
            View Employee List
          </button>
          <button
            onClick={() => navigate("/edit")}
            className="btn-primary"
          >
            Edit Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;