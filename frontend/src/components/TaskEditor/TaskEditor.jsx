import { useState } from "react";
import "./TaskEditor.css";



function TaskEditor({ setEditID, editedTask, saveTask, editID }) {

    const [hasError, setHasError] = useState('');
    const [requestError, setRequestError] = useState("");
    const [isSaving, setIsSaving] = useState(false);


    // ===================================
    async function handleSubmit(e) {
        e.preventDefault();

        if (isSaving) return;

        setRequestError("");

        const data = new FormData(e.currentTarget);

        const title = data.get("title").trim();
        const description = data.get("description").trim();
        const priority = data.get("priority");

        if (title.length < 1 || title.length > 100) {
            setHasError(true);
            return;
        }

        setHasError(false);
        setIsSaving(true);

        try {
            await saveTask(editID, title, description, priority);
        } catch (error) {
            console.error(error);
            setRequestError("Could not save changes. Please try again.");
        } finally {
            setIsSaving(false);
        }
    }


    // ===================================
    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) {
            setEditID(null);
        }
    }

    // ===================================
    function handleKeyDown(e) {
        if (e.key === "Escape") {
            setEditID(null);
        }
    }



    return (
        <div className="task-editor-overlay" onClick={handleOverlayClick} onKeyDown={handleKeyDown}>
            <section
                className="task-editor"
                role="dialog"
                aria-modal="true"
                aria-labelledby="task-editor-heading"
                aria-describedby="task-editor-description"
            >
                <form className="task-editor__form" onSubmit={handleSubmit} noValidate>
                    <header className="task-editor__header">
                        <h2 className="task-editor__title" id="task-editor-heading">
                            Edit task
                        </h2>

                        <p
                            className="task-editor__description"
                            id="task-editor-description"
                        >
                            Update the details below.
                        </p>
                    </header>

                    <div className="task-editor__field">
                        <label
                            className="task-editor__label"
                            htmlFor="edit-task-title"
                        >
                            Task title
                        </label>

                        <input
                            className={`task-editor__control ${hasError ? 'task-editor__control--error' : ''}`}
                            id="edit-task-title"
                            name="title"
                            type="text"
                            defaultValue={editedTask.title}
                            autoFocus

                            maxLength={100}
                            aria-describedby="edit-task-title-hint"
                            required
                        />

                        <p className="task-editor__hint" id="edit-task-title-hint">
                            Maximum 100 characters.
                        </p>

                        {
                            hasError && (
                                <p className="task-editor__error" id="edit-task-title-error"
                                    role="alert"
                                >
                                    Enter a task title between 1 and 100 characters.
                                </p>
                            )
                        }

                    </div>

                    <div className="task-editor__field">
                        <label
                            className="task-editor__label"
                            htmlFor="edit-task-description"
                        >
                            Description
                            <span className="task-editor__optional">Optional</span>
                        </label>

                        <textarea
                            className="task-editor__control task-editor__control--textarea"
                            id="edit-task-description"
                            name="description"
                            defaultValue={editedTask.description}
                            rows={4}
                            maxLength={500}
                            aria-describedby="edit-task-description-hint"
                        />

                        <p
                            className="task-editor__hint"
                            id="edit-task-description-hint"
                        >
                            Maximum 500 characters.
                        </p>
                    </div>

                    <div className="task-editor__field">
                        <label
                            className="task-editor__label"
                            htmlFor="edit-task-priority"
                        >
                            Priority
                        </label>

                        <select
                            className="task-editor__control"
                            id="edit-task-priority"
                            name="priority"
                            defaultValue={editedTask.priority}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {requestError && (
                        <p className="task-editor__error" role="alert">
                            {requestError}
                        </p>
                    )}

                    <div className="task-editor__actions">
                        <button
                            className="task-editor__button task-editor__button--secondary"
                            type="button"
                            onClick={() => setEditID(null)}
                        >
                            Cancel
                        </button>

                        <button
                            className="task-editor__button task-editor__button--primary"
                            type="submit"
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default TaskEditor;