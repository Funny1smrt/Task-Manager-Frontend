import { useState } from "react";
import useFirestore from "./hooks/useFirestore.js";
import LogoutButton from "./components/LogoutButton.jsx";
function App() {
    const {
        data: tasks,
        addData: addTask,
        deleteData: deleteTask,
        loading,
        error,
    } = useFirestore("tasks");
    const [input, setInput] = useState({});

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
    const handleAddTask = () => {
        addTask({ text: input?.text || "" });
        setInput({});
    };

    return (
        <main>
            <LogoutButton />
            <h1>Task manager</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <input
                type="text"
                name="text"
                value={input?.text || ""}
                onChange={handleChange}
            />
            <button onClick={() => handleAddTask()}>Add task</button>
            <ul>
                {tasks?.map((task) => (
                    <li key={task.id}>
                        {task.text}
                        <button onClick={() => deleteTask(task.id)}>
                            Видалити
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default App;
