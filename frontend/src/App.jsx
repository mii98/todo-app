import { useState, useEffect } from "react";
import "./App.css";
import Header from './components/Header/Header';
import TaskSummary from './components/TaskSummary/TaskSummary';
import TaskForm from './components/TaskForm/TaskForm';
import TaskFilters from './components/TaskFilters/TaskFilters';
import TaskList from './components/TaskList/TaskList';
import TaskEditor from './components/TaskEditor/TaskEditor';
import DeleteTaskModal from "./components/DeleteTaskModal/DeleteTaskModal";


const tasksUrl = `${import.meta.env.VITE_API_URL || ""}/api/v1/tasks`;



function App() {

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [filter, setFilter] = useState('all');
    const [editID, setEditID] = useState(null);
    const [deleteID, setDeleteID] = useState(null);


    // ================================
    useEffect(() => {

        async function loadTasks() {

            try {

                const response = await fetch(tasksUrl);

                if (!response.ok) {
                    throw new Error('Could not load tasks.');
                };

                const result = await response.json();

                const loadedTasks = result.data.tasks.map((task) => ({
                    ...task,
                    id: task._id,
                }));


                setTasks(loadedTasks);

            } catch (error) {
                console.error(error);
                setError("Could not load tasks. Please try refreshing the page.");
            } finally {
                setIsLoading(false);
            }
        };


        loadTasks();

    }, []);



    // addTask
    // ================================
    async function addTask(title, description, priority) {

        const response = await fetch(tasksUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                priority,
            })
        })


        if (!response.ok) {
            throw new Error("Could not add task. Please try again.");
        }

        const result = await response.json();

        const newTask = {
            ...result.data.task,
            id: result.data.task._id,
        }

        setTasks((prev) => [newTask, ...prev]);
    }


    // toggleTaks
    // ================================
    async function toggleTask(id) {

        const task = tasks.find(task => task.id === id);

        if (!task) return;

        const response = await fetch(`${tasksUrl}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                completed: !task.completed,
            })
        })


        if (!response.ok) {
            throw new Error("Could not update task. Please try again.");
        }

        const result = await response.json();

        const updatedTask = {
            ...result.data.task,
            id: result.data.task._id,
        };


        setTasks(prev => {
            return prev.map(task => {
                return task.id === id ? updatedTask : task
            })
        })
    }


    // filtredTasks
    // ================================
    const filtredTasks = tasks.filter(t => {
        if (filter === 'all') return tasks;
        return filter === 'active' ? !t.completed : t.completed;
    })




    // editedTask
    // ================================
    const editedTask = tasks.find(t => t.id === editID);


    async function saveTask(id, title, description, priority) {

        const response = await fetch(`${tasksUrl}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                priority,
            })
        })


        if (!response.ok) {
            throw new Error("Could not save changes. Please try again.");
        }


        const result = await response.json();

        const updatedTask = {
            ...result.data.task,
            id: result.data.task._id,
        };


        setTasks(prev => {
            return prev.map(task => {
                return task.id === id ? updatedTask : task;
            })
        })

        setEditID(null);
    }


    // delete task
    // ================================
    const taskToDelete = tasks.find(t => t.id === deleteID);

    async function deleteTask(id) {

        const response = await fetch(`${tasksUrl}/${id}`, {
            method: "DELETE",
        });


        if (!response.ok) {
            throw new Error("Could not delete task. Please try again.");
        };

        
        setTasks((prev) =>
            prev.filter((task) => task.id !== id)
        );

        setDeleteID(null);
    }


    return (
        <main className="app">
            <div className="app__container">
                <Header />
                <TaskSummary tasks={tasks} />

                <div className="app__workspace">
                    <TaskForm addTask={addTask} />

                    <section className="app__tasks" aria-labelledby="tasks-title">
                        <TaskFilters filter={filter} setFilter={setFilter} />

                        {
                            isLoading ? (
                                <p className="app__status" role="status">
                                    Loading tasks...
                                </p>

                            ) : error ? (
                                <p className="app__status app__status--error" role="alert">
                                    {error}
                                </p>

                            ) : (
                                <TaskList tasks={filtredTasks} toggleTask={toggleTask} setEditID={setEditID} setDeleteID={setDeleteID} filter={filter} filtredTasks={filtredTasks} />
                            )
                        }

                    </section>
                </div>

                {
                    editedTask && (
                        <TaskEditor setEditID={setEditID} editedTask={editedTask} saveTask={saveTask} editID={editID} />
                    )
                }

                {
                    taskToDelete && (
                        <DeleteTaskModal setDeleteID={setDeleteID} taskToDelete={taskToDelete} deleteTask={deleteTask} />
                    )
                }

            </div>
        </main>
    );
}

export default App;