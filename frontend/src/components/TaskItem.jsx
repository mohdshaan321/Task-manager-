
import React from 'react';
const TaskItem = ({ task, onToggle, onDelete }) => (
  <li className="flex items-center justify-between bg-white shadow-sm rounded-md p-4 mb-3 border border-gray-200 hover:shadow-md transition-shadow">
    <span
      className={`text-base font-medium ${
        task.completed ? 'line-through text-gray-400' : 'text-gray-800'
      }`}
    >
      {task.title}
    </span>

    <div className="flex gap-2">
      <button
        onClick={() => onToggle(task)}
        className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
          task.completed
            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            : 'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
      >
        {task.completed ? 'Undo' : 'Complete'}
      </button>

      <button
        onClick={() => onDelete(task._id)}
        className="px-3 py-1 rounded-md text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
      >
        Delete
      </button>
    </div>
  </li>
);

export default TaskItem;
