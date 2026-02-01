// src/components/TaskList.jsx
import { motion, AnimatePresence } from 'framer-motion';

function TaskList({ tasks, onDeleteTask, onCancelTask }) {

    const getDeadlineClass = (deadlineDate) => {
        // ... (Keep your existing logic here, copy from previous version) ...
        // Just re-pasting the logic for safety:
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(deadlineDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'deadline-passed';
        if (diffDays < 3) return 'deadline-soon';
        if (diffDays <= 7) return 'deadline-week';
        return 'deadline-ok';
    };

    return (
        <div className="task-list">
            <h3 style={{ color: 'white' }}>To-Do List</h3>

            {/* Wrapper for animations */}
            <AnimatePresence>
                {tasks.map(task => (
                    <motion.div
                        key={task.id}
                        className={`task-card ${getDeadlineClass(task.deadline)}`}

                        // Animation Settings
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="task-info">
                            <strong>{task.text}</strong>
                            <span>Due: {task.deadline}</span>
                        </div>

                        <div className="task-buttons">
                            <button className="btn-done" onClick={() => onDeleteTask(task.id)}>
                                Done ✓
                            </button>
                            <button className="btn-cancel" onClick={() => onCancelTask(task.id)}>
                                Cancel ✗
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {tasks.length === 0 && <p style={{ color: 'white', textAlign: 'center' }}>No tasks yet. Relax!</p>}
        </div>
    );
}

export default TaskList;