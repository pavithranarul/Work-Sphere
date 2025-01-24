import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEmployeePage.css";
const AddEmployeePage = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
  });
  const [error, setError] = useState("");

  const handleAddEmployee = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empId: Date.now().toString(), // Generate a unique empId
          name: employee.name.trim(),
          email: employee.email.trim(),
          position: employee.position.trim(),
          department: employee.department.trim(),
          salary: parseFloat(employee.salary), // Ensure salary is a number
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add employee. Please try again.");
      }

      const data = await response.json();
      alert(`Employee ${data.name} added successfully!`);
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    }
  };

 return (
    <div className="add-employee-page">
      <h1>Add Employee</h1>
      <form
        className="add-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddEmployee();
        }}
      >
        <label>
          Name: </label>
          <input
            type="text"
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            required
          />
        <label>
          Email:
        </label>
        <input
            type="email"
            value={employee.email}
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            required
          />
        <label>
          Position:
        </label>
        <input
            type="text"
            value={employee.position}
            onChange={(e) =>
              setEmployee({ ...employee, position: e.target.value })
            }
            required
          />
        <label>
          Department:
        </label>
        <input
            type="text"
            value={employee.department}
            onChange={(e) =>
              setEmployee({ ...employee, department: e.target.value })
            }
            required
          />
        <label>
          Salary:
        </label>
        <input
            type="number"
            value={employee.salary}
            onChange={(e) =>
              setEmployee({ ...employee, salary: e.target.value })
            }
            required
          />
        <button type="submit" className="btn-secondary">
          Add Employee
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <button
        className="btn-secondary"
        onClick={() => navigate("/")}
        style={{ marginTop: "10px" }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default AddEmployeePage;
