import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import { motion } from 'framer-motion';

const ProjectForm: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(!!projectId);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;

      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const project = res.data.find((p: any) => p._id === projectId);
        if (project) {
          setTitle(project.title);
          setDescription(project.description);
          setStatus(project.status);
        } else {
          setMessage('⚠️ Project not found.');
        }
      } catch {
        setMessage('❌ Failed to load project. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setMessage('');

    try {
      if (projectId) {
        await API.put(`/projects/${projectId}`, { title, description, status }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('✅ Project updated successfully!');
      } else {
        await API.post('/projects', { title, description, status }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('✅ Project created successfully!');
      }

      setTimeout(() => navigate('/dashboard'), 1000);
    } catch {
      setMessage('❌ Error saving project. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {projectId ? '✏️ Edit Project' : '📁 Add New Project'}
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading project...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            >
              {projectId ? 'Update Project' : 'Create Project'}
            </button>

            {message && (
              <p className="text-sm text-center mt-2 text-gray-700">{message}</p>
            )}
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectForm;
