import "./TaskSummary.css";



function TaskSummary ({ tasks }) {

    const activeTasks = tasks.filter(t => !t.completed).length;
    const completedTasks = tasks.filter(t => t.completed).length;

    return (
        <section className="task-summary" aria-label="Task overview">
            <dl className="task-summary__list">
                <div className="task-summary__item">
                    <dt className="task-summary__label">Total tasks</dt>
                    <dd className="task-summary__value">{tasks.length}</dd>
                </div>

                <div className="task-summary__item">
                    <dt className="task-summary__label">Active tasks</dt>
                    <dd className="task-summary__value">{activeTasks}</dd>
                </div>

                <div className="task-summary__item task-summary__item--completed">
                    <dt className="task-summary__label">Completed tasks</dt>
                    <dd className="task-summary__value">{completedTasks}</dd>
                </div>
            </dl>
        </section>
    );
}


export default TaskSummary;