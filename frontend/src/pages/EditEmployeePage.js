import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditEmployeePage.css";

const EditEmployeePage = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch employee data
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees");
        const data = await response.json();
        setEmployees(data);

        // If editing a specific employee, find the employee details
        if (id) {
          const selectedEmployee = data.find((emp) => emp.empId === id);
          setEmployee(selectedEmployee);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [id]);

  const handleSave = async () => {
    if (!employee) return;

    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update employee");
      }

      const updatedEmployee = await response.json();
      alert(`Employee ${updatedEmployee.name} updated successfully!`);
      navigate("/edit"); // Navigate back to the employee list
    } catch (error) {
      console.error("Error updating employee:", error.message);
      alert("Failed to update employee. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  // If editing a specific employee, show the edit form
  if (id && employee) {
    return (
      <div className="edit-employee-page">
        <h1>Edit Employee</h1>
        <form className="edit-form">
          <label>
            ID:
            <input
              type="text"
              value={employee.empId}
              onChange={(e) =>
                setEmployee({ ...employee, empId: e.target.value })
              }
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </label>
          <button type="button" onClick={handleSave} className="btn-primary">
            Save
          </button>
        </form>
        {/* Back to Home Button */}
        <button
          className="btn-secondary"
          onClick={() => navigate("/")}
          style={{ marginTop: "10px" }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  // If no specific employee is selected, show the employee list
  return (
    <div className="edit-employee-page">
      <h1>Edit Employee</h1>
      {employees.length > 0 ? (
        <div className="employee-list">
          {employees.map((employee) => (
            <button
              key={employee.empId}
              onClick={() => navigate(`/edit/${employee.empId}`)}
              className="btn-primary"
            >
              Edit {employee.name}
            </button>
          ))}
        </div>
      ) : (
        <p>No employees found. Add some employees to edit them.</p>
      )}
      {/* Back to Home Button */}
      <button
        className="btn-secondary"
        onClick={() => navigate("/")}
        style={{ marginTop: "20px" }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default EditEmployeePage;