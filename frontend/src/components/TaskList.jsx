
import React from 'react';
import TaskItem from './TaskItem';   // <-- default import

const TaskList = ({ tasks, onToggle, onDelete }) => (
  <ul>
    {tasks.map(task => (
      <TaskItem
        key={task._id}
        task={task}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    ))}
  </ul>
);

export default TaskList;
