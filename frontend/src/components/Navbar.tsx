import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex items-center justify-between shadow">
      <div className="flex space-x-4">
        <Link className="hover:text-yellow-300 font-semibold" to="/dashboard">Dashboard</Link>
        <Link className="hover:text-yellow-300 font-semibold" to="/projects">Projects</Link>
        <Link className="hover:text-yellow-300 font-semibold" to="/tasks">Tasks</Link>
        <Link className="hover:text-yellow-300 font-semibold" to="/profile">Profile</Link>
      </div>

      <button
        onClick={handleLogout}
        className="text-red-400 hover:text-red-600 font-semibold"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
