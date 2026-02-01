// src/components/TaskList.jsx

function TaskList({ tasks, onDeleteTask }) {

    // Helper to determine color based on deadline rubric 
    const getDeadlineClass = (deadlineDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight
        const due = new Date(deadlineDate);

        // Calculate difference in days
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'deadline-passed'; // Red 
        if (diffDays < 3) return 'deadline-soon';   // Orange 
        if (diffDays <= 7) return 'deadline-week';  // Yellow 
        return 'deadline-ok'; // Normal
    };

    return (
        <div className="task-list">
            <h3>To-Do List</h3>
            {tasks.length === 0 && <p>No tasks yet.</p>}

            {tasks.map(task => (
                <div key={task.id} className={`task-card ${getDeadlineClass(task.deadline)}`}>
                    <div className="task-info">
                        <strong>{task.text}</strong>
                        <span>Due: {task.deadline}</span>
                    </div>
                    <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default TaskList;