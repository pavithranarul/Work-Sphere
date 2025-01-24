const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const DB_URL = "mongodb://localhost:27017/employeeDB";
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected to:", DB_URL))
  .catch((err) => console.error("MongoDB connection error:", err));


// Define Employee Schema and Model
const employeeSchema = new mongoose.Schema({
    empId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true },
});


const Employee = mongoose.model("Employee", employeeSchema);

// Root Route
app.get("/", (req, res) => {
  res.send("Employee Management API is running!");
});

// GET Route for Employee by ID
app.get("/api/employees/:id", async (req, res) => {
  console.log("Fetching employee with ID:", req.params.id);
  try {
    const employee = await Employee.findOne({ empId: req.params.id });
    if (!employee) {
      console.log("Employee not found:", req.params.id);
      return res.status(404).json({ message: "Employee not found" });
    }
    console.log("Employee fetched:", employee);
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST Route to Add a New Employee
app.post("/api/employees", async (req, res) => {
  try {
    const { empId, name, email, position, department, salary } = req.body;

    // Validate required fields
    if (!empId || !name || !email || !position || !department || salary == null) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Ensure salary is a number
    if (isNaN(salary)) {
      return res.status(400).json({ error: "Salary must be a number." });
    }

    // Check for duplicate empId
    const existingEmployee = await Employee.findOne({ empId });
    if (existingEmployee) {
      return res.status(400).json({ error: "Employee with this empId already exists." });
    }

    // Save new employee
    const newEmployee = new Employee({ empId, name, email, position, department, salary });
    await newEmployee.save();

    console.log("New employee added:", newEmployee);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT Route to Update Employee
app.put("/api/employees/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { empId: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedEmployee) {
      console.log("Employee updated:", updatedEmployee);
      res.status(200).json(updatedEmployee);
    } else {
      console.log("Employee not found for update:", req.params.id);
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(400).json({ error: "Failed to update employee" });
  }
});

// GET Route to Fetch All Employees
app.get("/api/employees", async (req, res) => {
  console.log("Fetching all employees...");
  try {
    const employees = await Employee.find();
    console.log("Employees fetched:", employees);
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.delete("/api/employees/:id", async (req, res) => {
    const empId = req.params.id;
    console.log("DELETE request received for empId:", empId);
    try {
        const deletedEmployee = await Employee.findOneAndDelete({ empId });
        console.log("Deleted Employee:", deletedEmployee);
        if (!deletedEmployee) {
            return res.status(404).send("Employee not found");
        }
        res.status(200).send("Employee deleted successfully");
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).send("Server error");
    }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});