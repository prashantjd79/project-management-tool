import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import ProjectForm from './pages/ProjectForm';
import TaskForm from './pages/TaskForm';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage'; // Add this at the top


const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      {}
      {isLoggedIn && !isAuthPage && <Navbar />}

      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

       
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/add" element={<ProjectForm />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/projects/:projectId/edit" element={<ProjectForm />} />
<Route path="*" element={<LandingPage />} />

       
        <Route path="/projects/:projectId/tasks/add" element={<TaskForm />} />
        <Route path="/projects/:projectId/tasks/:taskId/edit" element={<TaskForm />} />

        
        <Route
          path="*"
          element={
            <div className="p-4 text-center text-lg">
              Welcome to <strong>Project Management Tool ✅</strong>
            </div>
          }
        />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
