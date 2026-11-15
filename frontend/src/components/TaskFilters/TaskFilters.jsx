import "./TaskFilters.css";


function TaskFilters ({ filter, setFilter }) {



    return (
        <div className="task-filters">
            <div className="task-filters__heading">
                <h2 className="task-filters__title" id="tasks-title">
                    Your tasks
                </h2>

                <p className="task-filters__description">
                    Small steps, steady progress.
                </p>
            </div>

            <div
                className="task-filters__group"
                role="group"
                aria-label="Filter tasks"
            >
                <button
                    className={`task-filters__button ${filter === 'all' ? 'task-filters__button--selected' : ''}`}
                    type="button"
                    aria-pressed={true}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>

                <button
                    className={`task-filters__button ${filter === 'active' ? 'task-filters__button--selected' : ''}`}
                    type="button"
                    aria-pressed={false}
                    onClick={() => setFilter('active')}
                >
                    Active
                </button>

                <button
                    className={`task-filters__button ${filter === 'completed' ? 'task-filters__button--selected' : ''}`}
                    type="button"
                    aria-pressed={false}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </button>
            </div>
        </div>
    );
}

export default TaskFilters;