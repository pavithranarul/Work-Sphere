import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Employee Management</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add Employee</Link>
        </li>
<li>
  <Link to="/edit/123">Edit Employee </Link>
</li>
<li>
          <Link to="/employees">Employee List</Link> {/* Link to Employee List */}
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;