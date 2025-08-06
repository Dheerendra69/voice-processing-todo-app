import React, { useState } from 'react';

function TaskInput({ addTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Enter task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add
      </button>
    </form>
  );
}

export default TaskInput;
