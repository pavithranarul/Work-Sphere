import React, { useState, useEffect } from "react";
import { getEmployees, deleteEmployeeById } from "../api";
import { useNavigate } from "react-router-dom";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch employees. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(); // Fetch employees on component mount
  }, []);

  const handleEdit = (empId) => {
    navigate(`/edit/${empId}`);
  };

  const handleDelete = async (empId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      try {
        await deleteEmployeeById(empId);
        fetchEmployees(); // Refresh the list after deleting an employee
      } catch (err) {
        alert("Failed to delete employee. Please try again.");
      }
    }
  };

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="employee-list-container">
      <h1>Employee List</h1>
      {employees.length === 0 ? (
        <p>No employees found. Please add new employees.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.empId}>
                <td>{employee.empId}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.email || "Not Provided"}</td>
                <td>{employee.department || "Not Provided"}</td>
                <td>{employee.salary || "Not Provided"}</td>
                <td className="action-buttons">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(employee.empId)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(employee.empId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;