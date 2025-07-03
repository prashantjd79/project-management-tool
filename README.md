# Project Management Tool ✅

A basic full-stack Project Management App with user authentication, project CRUD, task tracking, and seed data.

---

## ✅ Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, JWT, bcrypt
- **Frontend:** React.js + TypeScript + Tailwind CSS
- **Database:** MongoDB
- **API Testing:** Postman
- **Seed Script:** Node.js Seeder

---

## ✅ Features

### Backend (Node.js + Express.js)

- User Registration & Login (JWT Auth, Password Hashing)
- CRUD for Projects
- CRUD for Tasks (Nested under Projects)
- Filter Tasks by Status
- Protected Routes (JWT Auth Middleware)
- MongoDB Models with Mongoose
- Seeder Script for Dummy Data

### Frontend (React + TypeScript)

- Login/Register Pages
- Dashboard (User’s Projects)
- Project Details Page (Tasks with Filter by Status)
- Add/Edit Project Form
- Add/Edit Task Form
- React Router + Axios + Tailwind CSS Styling

---

## ✅ Setup Instructions

### 1. Backend Setup (Node + Express + MongoDB)

```bash
cd backend
npm install
npm run dev

> Make sure MongoDB is running and `.env` file has correct connection string:

`.env`

```
MONGO_URI=mongodb://localhost:27017/project-management
JWT_SECRET=your_jwt_secret
```

---

### 2. Run Seed Script (For Dummy Test Data)

```bash
npm run seed
```

✅ This will create:

* User: **[test@example.com](mailto:test@example.com)** / Password: **Test\@123**
* 2 Projects (linked to above user)
* 3 Tasks in each project

---

### 3. Frontend Setup (React + TypeScript + Tailwind)

```bash
cd ../frontend
npm install
npm start
```

---

## ✅ API Endpoints (Main)

| Method | Endpoint                                 | Description                                  |
| ------ | ---------------------------------------- | -------------------------------------------- |
| POST   | `/api/auth/register`                     | User Registration                            |
| POST   | `/api/auth/login`                        | User Login                                   |
| GET    | `/api/projects`                          | Get all projects for logged-in user          |
| POST   | `/api/projects`                          | Create new project                           |
| PUT    | `/api/projects/:id`                      | Update project                               |
| DELETE | `/api/projects/:id`                      | Delete project                               |
| GET    | `/api/projects/:projectId/tasks`         | Get tasks for project (filterable by status) |
| POST   | `/api/projects/:projectId/tasks`         | Create task                                  |
| PUT    | `/api/projects/:projectId/tasks/:taskId` | Update task                                  |
| DELETE | `/api/projects/:projectId/tasks/:taskId` | Delete task                                  |

---

## ✅ Known Limitations

* No unit tests (Optional bonus)
* No pagination or search (Optional bonus)
* No Docker (Optional bonus)
* No Redux/Zustand (Kept simple for clarity)

---

## ✅ Optional Future Improvements (Bonus Points Ideas)

* Add Pagination & Search on Projects
* Implement Form Validation using Yup / React Hook Form
* Add Unit Tests using Jest
* Dockerize Backend and Frontend
* Implement Global State Management (Redux or Zustand)

---

## ✅ Project Folder Structure:

```
project-management-tool/
├── backend/
├── frontend/
├── README.md
```

---

## ✅ Demo Credentials

* **Email:** [test@example.com](mailto:test@example.com)
* **Password:** Test\@123

---

## ✅ Author:

Prashant Singh 😄 ✅

```
```

