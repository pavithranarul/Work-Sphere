import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../api"; // API function to fetch employee details

const EmployeeDetailsPage = () => {
  const { id } = useParams(); // Extract employee ID from URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) {
        setError("Invalid employee ID");
        setLoading(false);
        return;
      }
      try {
        console.log("Fetching employee data for ID:", id); // Debugging
        const data = await getEmployeeById(id); // Fetch employee details
        console.log("Employee data fetched:", data); // Debugging
        setEmployee(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching employee details:", err); // Debugging
        setError(err.message || "Failed to fetch employee details");
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <p>Loading employee data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Employee Details</h2>
      {employee && (
        <div>
          <p><strong>ID:</strong> {employee.empId}</p>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Salary:</strong> ${employee.salary}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailsPage;