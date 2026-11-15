import { useState, useEffect, useRef } from "react";
import "./TaskForm.css";



function TaskForm({ addTask }) {

    // ================================
    const [hasError, setHasError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [requestError, setRequestError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    // ================================
    const messageTimer = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(messageTimer.current);
        };
    }, []);


    // handleSubmit
    // ================================
    async function handleSubmit(e) {
        e.preventDefault();

        if (isSubmitting) return;

        clearTimeout(messageTimer.current);

        setHasError(false);
        setIsSuccess(false);
        setRequestError("");

        const form = e.currentTarget;
        const data = new FormData(form);

        const title = data.get("title").trim();
        const description = data.get("description").trim();
        const priority = data.get("priority");

        const titleLength = title.length;

        try {
            if (titleLength < 1 || titleLength > 100) {
                setHasError(true);
                return;
            }

            setIsSubmitting(true);

            await addTask(title, description, priority);

            form.reset();
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            setRequestError("Could not add task. Please try again.");
        } finally {
            setIsSubmitting(false);

            messageTimer.current = setTimeout(() => {
                setHasError(false);
                setIsSuccess(false);
                setRequestError("");
            }, 1500);
        }
    }



    return (
        <section className="task-form" aria-labelledby="task-form-title">
            <header className="task-form__header">
                <h2 className="task-form__title" id="task-form-title">
                    New task
                </h2>

                <p className="task-form__description">
                    Give your next step a place to start.
                </p>
            </header>

            <form className="task-form__form" onSubmit={handleSubmit} noValidate>
                <div className="task-form__field">
                    <label className="task-form__label" htmlFor="task-title">
                        Task title
                    </label>

                    <input
                        className="task-form__control"
                        id="task-title"
                        name="title"
                        type="text"
                        placeholder="What needs to get done?"
                        maxLength={100}
                        aria-describedby="task-title-hint"
                        required
                    />

                    <p className="task-form__hint" id="task-title-hint">
                        Keep it clear and specific. Maximum 100 characters.
                    </p>

                    <p className="task-form__error" id="task-title-error" hidden={!hasError}>
                        Enter a title between 1 and 100 characters.
                    </p>

                </div>

                <div className="task-form__field">
                    <label className="task-form__label" htmlFor="task-description">
                        Description
                        <span className="task-form__optional">Optional</span>
                    </label>

                    <textarea
                        className="task-form__control task-form__control--textarea"
                        id="task-description"
                        name="description"
                        placeholder="Add any details that might help..."
                        rows={4}
                        maxLength={500}
                        aria-describedby="task-description-hint"
                    />

                    <p className="task-form__hint" id="task-description-hint">
                        Maximum 500 characters.
                    </p>
                </div>

                <div className="task-form__field">
                    <label className="task-form__label" htmlFor="task-priority">
                        Priority
                    </label>

                    <select
                        className="task-form__control"
                        id="task-priority"
                        name="priority"
                        defaultValue="medium"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <button
                    className="task-form__submit"
                    type="submit"
                    disabled={isSubmitting}
                >
                    <span
                        className="task-form__submit-icon"
                        aria-hidden="true"
                    >
                        +
                    </span>

                    {isSubmitting ? "Adding..." : "Add task"}
                </button>

                {requestError && (
                    <p className="task-form__error" role="alert">
                        {requestError}
                    </p>
                )}

                <p
                    className={`task-form__feedback task-form__feedback--success`}
                    role="status"
                    hidden={!isSuccess}
                >
                    Task added successfully.
                </p>

            </form>
        </section>
    );
}

export default TaskForm;