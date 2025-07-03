import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-white shadow-md p-8 rounded-lg max-w-lg"
      >
        <h1 className="text-3xl font-bold mb-4 text-indigo-800">
          🚀 Welcome to Project Management Tool
        </h1>
        <p className="text-gray-700 mb-6">
          Track your projects and tasks efficiently and stay organized.
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-300 text-gray-800 px-5 py-2 rounded hover:bg-gray-400 transition"
          >
            Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
