import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const TaskForm: React.FC = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      if (projectId && taskId) {
        try {
          const token = localStorage.getItem('token');
          const res = await API.get(`/projects/${projectId}/tasks`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const task = res.data.find((t: any) => t._id === taskId);
          if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
            setDueDate(task.dueDate ? task.dueDate.substring(0, 10) : '');
          }
        } catch (error) {
          console.error('Error fetching task');
        }
      }
    };
    fetchTask();
  }, [projectId, taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (taskId) {
        await API.put(`/projects/${projectId}/tasks/${taskId}`, {
          title,
          description,
          status,
          dueDate,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('Task updated!');
      } else {
        await API.post(`/projects/${projectId}/tasks`, {
          title,
          description,
          status,
          dueDate,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('Task created!');
      }
      navigate(`/projects/${projectId}`);
    } catch (error) {
      setMessage('Error saving task');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{taskId ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="border p-2 w-full mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input
          className="border p-2 w-full mb-2"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button className="bg-green-500 text-white p-2 w-full" type="submit">
          {taskId ? 'Update' : 'Create'}
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default TaskForm;
