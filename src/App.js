import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import useVoiceCommand from "./hooks/useVoiceCommand";
import parseCommand from "./utils/commandParser";

const LOCAL_STORAGE_KEY = "voice-todo-tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      setTasks(saved.tasks);
      console.log(saved);
    } catch (err) {
      console.error("Failed to read tasks:", err);
      // localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      const payload = {
        tasks,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error("Failed to save tasks:", err);
    }
  }, [tasks]);

  const addTask = (text) => {
    if (text && !tasks.includes(text)) {
      setTasks([...tasks, text]);
    }
  };

  const deleteTask = (text) => {
    setTasks(tasks.filter((task) => task !== text));
  };

  const handleVoiceCommand = (speech) => {
    const { action, task } = parseCommand(speech);
    if (action === "add") {
      addTask(task);
    } else if (action === "delete") {
      deleteTask(task);
    }
  };

  const { isListening, toggleListening, speechText } =
    useVoiceCommand(handleVoiceCommand);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <div className="max-w-xl mx-auto mt-6 p-4">
        <TaskInput addTask={addTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} />

        {speechText && (
          <div className="text-center mt-4 text-lg text-gray-700 italic">
            You said: "{speechText}"
          </div>
        )}

        <div className="mt-4 flex justify-center">
          <button
            onClick={toggleListening}
            className={`px-4 py-2 rounded-md shadow ${
              isListening ? "bg-red-500" : "bg-blue-500"
            } text-white`}
          >
            {isListening ? "Stop Listening" : "Start Voice Command 🎙️"}
          </button>
        </div>

        <div className="mt-6 p-4 bg-white border rounded-lg shadow text-gray-700 text-sm">
          <h2 className="font-semibold text-base mb-2">
            🎙 Voice Commands You Can Say:
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <span className="font-medium">Add task</span> to buy groceries
            </li>
            <li>
              <span className="font-medium">Add task</span> to complete
              assignment
            </li>
            <li>
              <span className="font-medium">Delete task</span> buy groceries
            </li>
          </ul>
          <p className="mt-3 italic text-gray-500 text-xs">
            Note: After speaking, your command will be processed and listening
            will automatically stop.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
