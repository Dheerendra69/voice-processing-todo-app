import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import useVoiceCommand from "./hooks/useVoiceCommand";
import parseCommand from "./utils/commandParser";

const LOCAL_STORAGE_KEY = "voice-todo-tasks";
const EXPIRY_DAYS = 3;

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (data) {
      const now = new Date().getTime();
      const age = now - data.timestamp;
      const maxAge = EXPIRY_DAYS * 24 * 60 * 60 * 1000; 

      if (age < maxAge) {
        setTasks(data.tasks);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    const payload = {
      tasks,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
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
      </div>
    </div>
  );
}

export default App;
