import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { motion } from 'framer-motion';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate?: string;
}

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('⚠️ Please login first.');
      setLoading(false);
      return;
    }

    try {
      const res = await API.get(`/projects/${projectId}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
        params: statusFilter ? { status: statusFilter } : {},
      });
      setTasks(res.data);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const handleDelete = async (taskId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await API.delete(`/projects/${projectId}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error deleting task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">📋 Project Tasks</h2>

        {}
        <div className="mb-4">
          <label className="block mb-1 text-gray-600 font-medium">Filter by Status:</label>
          <select
            className="border border-gray-300 p-2 rounded w-full"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Messages */}
        {message && <p className="text-red-500 text-sm mb-3">{message}</p>}
        {loading && <p className="text-gray-500 text-sm mb-3">⏳ Loading tasks...</p>}
        {!loading && tasks.length === 0 && !message && (
          <p className="text-gray-600">No tasks found for this project.</p>
        )}

        {}
        <div className="space-y-4">
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              className="border p-4 rounded shadow-sm bg-gray-50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
              {task.dueDate && (
                <p className="text-sm text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}

              <div className="mt-2 flex gap-4">
                <Link
                  to={`/projects/${projectId}/tasks/${task._id}/edit`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {}
        <Link
          to={`/projects/${projectId}/tasks/add`}
          className="mt-6 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          ➕ Add Task
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetails;
