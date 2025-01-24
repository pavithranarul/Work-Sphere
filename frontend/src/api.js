import axios from "axios";

const API_URL = "http://localhost:5000/api/employees"; // Backend URL

// Fetch all employees
export const getEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error.response?.data || error.message);
    throw new Error("Failed to fetch employees");
  }
};

// Fetch employee by ID
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employee by ID:", error.response?.data || error.message);
    throw new Error("Failed to fetch employee data");
  }
};

// Update employee details
export const updateEmployee = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data; // Ensure backend returns updated employee
  } catch (error) {
    console.error("Error updating employee:", error.response?.data || error.message);
    throw new Error("Failed to update employee");
  }
};
export const addEmployee = async (employeeData) => {
  const response = await fetch("http://localhost:5000/api/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData),
  });
  return response.json();
};


// Delete employee by ID
export const deleteEmployeeById = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting employee:", error.response?.data || error.message);
    throw new Error("Failed to delete employee");
  }
};