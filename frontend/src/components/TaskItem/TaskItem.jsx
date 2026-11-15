import { useState } from "react";
import "./TaskItem.css";



function TaskItem({ task, toggleTask, setEditID, setDeleteID }) {

    const [isUpdating, setIsUpdating] = useState(false);
    const [requestError, setRequestError] = useState("");


    async function handleToggle() {
        if (isUpdating) return;

        setRequestError("");
        setIsUpdating(true);

        try {
            await toggleTask(task.id);
        } catch (error) {
            console.error(error);
            setRequestError("Could not update task. Please try again.");
        } finally {
            setIsUpdating(false);
        }
    }


    return (
        <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
            <label className="task-item__toggle">
                <input
                    className="task-item__checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleToggle}
                    disabled={isUpdating}
                    aria-label={
                        task.completed
                            ? `Mark ${task.title} as active`
                            : `Mark ${task.title} as completed`
                    }
                />
            </label>

            <div className="task-item__content">
                <h3 className="task-item__title">{task.title}</h3>

                {
                    task.description && (
                        <p className="task-item__description">
                            {task.description}
                        </p>
                    )
                }

                <div className="task-item__meta">
                    <p className={`task-item__priority task-item__priority--${task.priority}`}>
                        {task.priority} priority
                    </p>
                </div>
            </div>

            <div className="task-item__actions">
                <button
                    className="task-item__action"
                    type="button"
                    aria-label={`Edit task: ${task.title}`}
                    onClick={() => setEditID(task.id)}
                >
                    Edit
                </button>

                <button
                    className="task-item__action task-item__action--delete"
                    type="button"
                    aria-label={`Delete task: ${task.title}`}
                    onClick={() => setDeleteID(task.id)}
                >
                    Delete
                </button>
            </div>

            {requestError && (
                <p className="task-item__error" role="alert">
                    {requestError}
                </p>
            )}
        </li>
    );
}

export default TaskItem;