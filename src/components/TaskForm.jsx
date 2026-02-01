// src/components/TaskForm.jsx
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Ensure you installed uuid: npm install uuid

function TaskForm({ onAddTask }) {
    const [taskText, setTaskText] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!taskText || !deadline) return;

        const newTask = {
            id: uuidv4(), // Generates a unique ID
            text: taskText,
            deadline: deadline,
            createdAt: new Date().toISOString()
        };

        onAddTask(newTask);

        // Reset form
        setTaskText('');
        setDeadline('');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h3>Add New Task</h3>

            <div className="form-group">
                <label>Task:</label>
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Enter task description..."
                />
            </div>

            <div className="form-group">
                <label>Deadline:</label>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>

            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;