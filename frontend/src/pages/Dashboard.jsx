// import { useState, useContext } from 'react';
// import { login } from '../services/api';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login: doLogin } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await login({ email, password });
//     doLogin(res.data.token);
//     navigate('/dashboard');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🔐 Login</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-sm text-gray-600 text-center mt-4">
//           Don’t have an account?{' '}
//           <Link to="/register" className="text-blue-600 hover:underline font-medium">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); // Or use context if available

  useEffect(() => {
    if (!token) return navigate('/');
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks(token);
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      await createTask({ title: newTask }, token);
      setNewTask('');
      fetchTasks();
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateTask(id, { title: editingText }, token);
      setEditingTaskId(null);
      setEditingText('');
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
      fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📋 Dashboard</h2>

      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="flex-1 px-4 py-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add
        </button>
      </form>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
            {editingTaskId === task._id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="flex-1 px-2 py-1 border rounded mr-2"
              />
            ) : (
              <span>{task.title}</span>
            )}

            <div className="flex gap-2">
              {editingTaskId === task._id ? (
                <button
                  onClick={() => handleUpdate(task._id)}
                  className="text-green-600 hover:underline"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingTaskId(task._id);
                    setEditingText(task.title);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
