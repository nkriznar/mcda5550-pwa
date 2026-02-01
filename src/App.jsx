// src/App.jsx
import { useState, useEffect } from 'react';
import { addTask, getAllTasks, deleteTask } from './db'; // Import DB helpers
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Quote from './components/Quote';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // 1. Load tasks from IndexedDB on startup [cite: 34]
  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await getAllTasks();
      setTasks(storedTasks || []);
    };
    fetchTasks();
  }, []);

  // 2. Monitor Offline Status [cite: 40, 86]
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 3. Handle Add Task
  const handleAddTask = async (newTask) => {
    // Save to DB
    await addTask(newTask);
    // Update State
    setTasks((prev) => [...prev, newTask]);
  };

  // 4. Handle Delete Task [cite: 60]
  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter(t => t.id !== id));
  };

  return (
    <div className="app-container">
      {/* Offline Indicator [cite: 86] */}
      {isOffline && (
        <div className="offline-banner" style={{ background: 'orange', padding: '10px', textAlign: 'center' }}>
          ⚠️ You are currently offline. Application is running in Offline Mode.
        </div>
      )}

      <h1>MCDA5550 Task Manager</h1>

      {/* Quote Component */}
      <div className="quote-section">
        <Quote />
      </div>

      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default App;