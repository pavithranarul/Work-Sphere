# worksphere
a coolest platform to manage employee records

## Project overview
WorkSphere is a robust and intuitive application designed to simplify HR operations. It offers key features like viewing, adding, updating, and deleting employee records, enabling organizations to manage their workforce effectively.

## Installation Instructions
Follow these steps to set up the project on your local machine:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/pavithranarul/worksphere
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd worksphere
   ```

3. **Install Dependencies for backend and frontend**:
   Ensure Node.js and npm are installed on your system, then run:
   ```bash
   cd backend
   ```
   ```bash
   npm install
   ```
   ```bash
   cd ..
   ```
   ```bash
   cd frontend
   ```
   ```bash
   npm install
   ```


4. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory.
   - Use the `.env.example` file as a reference to configure the required environment variables.
   - `.env` ensure that the database is connected properly

5. **Run the Application**:
   Start the development server:
   ```bash
   npm start
   ```

6. **Access the Application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## How to create a database
open in terminal
1. **open mongosh shell**:
      ```bash
      mongosh
      ```
2. **show database** :
      ```bash
      show dbs;
      ```
3. **create database** :
      ```bash
      use worksphereDb;
      ```
4. **create table** :
      ```bash
      db.createCollections("employee")
      ```
5. **insert data** :
      ```bash
      db.admin.insertOne({ username: "admin", password: "securepassword123" })
      ```
6. **check the data** :
      ```bash
      db.admin.find()
      ```
      
## Usage
Once the application is up and running:

  1. Use the sidebar or menu to navigate through different sections.
  2. Perform actions such as:
       - Viewing the list of employees.
       - Adding new employees.
       - Updating existing employee records.
       - Deleting employee records.

## API Endpoints
Here are the available API routes and their descriptions:

| Method | Endpoint             | Description                               |
|--------|----------------------|-------------------------------------------|
| GET    | `/api/employees`     | Retrieve a list of all employees.         |
| GET    | `/api/employees/:id` | Retrieve details of a specific employee.  |
| POST   | `/api/employees`     | Add a new employee record.                |
| PUT    | `/api/employees/:id` | Update an existing employee record.       |
| DELETE | `/api/employees/:id` | Delete an employee record.                |
