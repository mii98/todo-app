import { useState } from "react";
import "./DeleteTaskModal.css";



function DeleteTaskModal({ setDeleteID, taskToDelete, deleteTask }) {


    const [isDeleting, setIsDeleting] = useState(false);
    const [requestError, setRequestError] = useState("");


    async function handleDelete() {
        if (isDeleting) return;

        setRequestError("");
        setIsDeleting(true);

        try {
            await deleteTask(taskToDelete.id);
        } catch (error) {
            console.error(error);
            setRequestError("Could not delete task. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    }


    // ============================
    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) {
            setDeleteID(null);
        }
    }


    // ============================
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            setDeleteID(null);
        }
    }



    return (
        <div className="delete-task-overlay" onClick={handleOverlayClick} onKeyDown={handleKeyDown}>
            <section
                className="delete-task-modal"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-task-heading"
                aria-describedby="delete-task-description delete-task-name"
            >
                <header className="delete-task-modal__header">
                    <p className="delete-task-modal__eyebrow">
                        DELETE TASK
                    </p>

                    <h2
                        className="delete-task-modal__title"
                        id="delete-task-heading"
                    >
                        Delete this task?
                    </h2>

                    <p
                        className="delete-task-modal__description"
                        id="delete-task-description"
                    >
                        This task will be permanently removed. This action
                        cannot be undone.
                    </p>
                </header>

                <div className="delete-task-modal__preview">
                    <p className="delete-task-modal__label">
                        Selected task
                    </p>

                    <p
                        className="delete-task-modal__task-name"
                        id="delete-task-name"
                    >
                        {taskToDelete.title}
                    </p>
                </div>

                {requestError && (
                    <p className="delete-task-modal__error" role="alert">
                        {requestError}
                    </p>
                )}

                <div className="delete-task-modal__actions">
                    <button
                        className="delete-task-modal__button delete-task-modal__button--secondary"
                        type="button"
                        onClick={() => setDeleteID(null)}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-task-modal__button delete-task-modal__button--danger"
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete task"}
                    </button>
                </div>
            </section>
        </div>
    );
}

export default DeleteTaskModal;