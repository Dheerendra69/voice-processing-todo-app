import React from 'react';

function TaskItem({ task, deleteTask }) {
  return (
    <li className="flex justify-between items-center bg-white p-3 rounded shadow">
      <span>{task}</span>
      <button
        onClick={() => deleteTask(task)}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
