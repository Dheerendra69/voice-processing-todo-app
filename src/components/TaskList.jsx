import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, deleteTask }) {
  return (
    <ul className="space-y-2">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

export default TaskList;
