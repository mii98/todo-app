import "./TaskList.css";
import TaskItem from '../TaskItem/TaskItem';




function TaskList({ tasks, toggleTask, setEditID, setDeleteID, filter, filtredTasks }) {
    
    let emptyTitle;
    let emptyDescription;

    if (filter === 'all' && !tasks.length) {
        emptyTitle = 'No tasks yet';
        emptyDescription = 'Add your first task to get started.';

    } else if (filter === 'completed' && !filtredTasks.length) {
        emptyTitle = 'No completed tasks yet';
        emptyDescription = 'Complete a task and it will appear here.';

    } else if (filter === 'active' && !filtredTasks.length) {
        emptyTitle = 'All caught up';
        emptyDescription = 'You have no active tasks.';
    }

    
    return (
        <div className="task-list">

            <ul className="task-list__items">
                {
                    tasks.map(task => {

                        return (
                            <TaskItem key={task.id} task={task} toggleTask={toggleTask} setEditID={setEditID} setDeleteID={setDeleteID} />
                        )
                    })
                }
            </ul>

            {
                !tasks.length && (
                    <div className="task-list__empty">
                        <span className="task-list__empty-icon" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </span>

                        <h3 className="task-list__empty-title">{emptyTitle}</h3>

                        <p className="task-list__empty-description">
                            {emptyDescription}
                        </p>
                    </div>
                )
            }

        </div>
    );
}
// Add your first task to get started.
export default TaskList;