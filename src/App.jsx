// src/App.jsx
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti'; // Import Confetti
import { addTask, getAllTasks, deleteTask } from './db';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Quote from './components/Quote';
import './App.css';

// Custom hook for window dimensions
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti
  const [showCancelEmoji, setShowCancelEmoji] = useState(false); // State for cancel emoji
  const { width, height } = useWindowSize(); // Get window dimensions

  // ... (Keep your existing useEffects for loading tasks and offline status) ...
  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await getAllTasks();
      setTasks(storedTasks || []);
    };
    fetchTasks();
  }, []);

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

  const handleAddTask = async (newTask) => {
    await addTask(newTask);
    setTasks((prev) => [...prev, newTask]);
  };

  // Handle completing a task with Confetti
  const handleDeleteTask = async (id) => {
    // 1. Trigger Confetti
    setShowConfetti(true);

    // 2. Remove task
    await deleteTask(id);
    setTasks((prev) => prev.filter(t => t.id !== id));
  };

  // Handle cancelling a task with shrug emoji
  const handleCancelTask = async (id) => {
    // 1. Show shrug emoji
    setShowCancelEmoji(true);

    // 2. Hide emoji after 2 seconds
    setTimeout(() => setShowCancelEmoji(false), 2000);

    // 3. Remove task
    await deleteTask(id);
    setTasks((prev) => prev.filter(t => t.id !== id));
  };

  // Callback when all confetti has fallen off screen
  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  return (
    <>
      {/* Confetti Overlay - Outside app-container for full screen coverage */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          recycle={false}
          gravity={0.22}
          initialVelocityY={15}
          tweenDuration={8000}
          onConfettiComplete={handleConfettiComplete}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Cancel Emoji - Floats up to the right of the box */}
      {showCancelEmoji && (
        <div className="cancel-emoji-container">
          <span className="cancel-emoji">🤷</span>
        </div>
      )}

      <div className="app-container">
        {isOffline && (
          <div className="offline-banner" style={{ background: 'orange', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
            ⚠️ You are offline
          </div>
        )}

        <h1>Task Master</h1>

        <div className="quote-section">
          <Quote />
        </div>

        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onCancelTask={handleCancelTask} />
      </div>
    </>
  );
}

export default App;