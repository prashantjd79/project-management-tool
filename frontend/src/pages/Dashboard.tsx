import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../services/api';

interface Project {
  _id: string;
  title: string;
  description: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please login first');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        const res = await API.get('/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err: any) {
        setMessage(err.response?.data?.message || 'Error fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await API.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error deleting project');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">📁 Your Projects</h2>

        <div className="flex justify-end mb-4">
          <Link
            to="/projects/add"
            className="bg-green-500 text-white px-4 py-2 text-sm rounded hover:bg-green-600 transition"
          >
            ➕ Add New Project
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-600 text-center">Loading projects...</p>
        ) : message ? (
          <p className="text-red-500 text-center">{message}</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-600">No projects found. Start by adding one!</p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="border p-4 rounded bg-gray-50 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                <p className="text-gray-700">{project.description}</p>
                <p className="text-sm text-gray-500 mb-2">Status: {project.status}</p>

                <div className="flex justify-between">
                  <Link
                    to={`/projects/${project._id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    🔍 View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
