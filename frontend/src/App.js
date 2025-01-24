import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeeList from "./pages/EmployeeList";
import AddEmployeePage from "./pages/AddEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage"; // Updated for editing employees
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/add" element={<AddEmployeePage />} />
        <Route path="/edit" element={<EditEmployeePage />} />
        <Route path="/edit/:id" element={<EditEmployeePage />} /> {/* Specific edit */}
        <Route path="/details/:id" element={<EmployeeDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;