import TaskForm from "./TaskForm";
import { useState } from "react";

function TaskController() {
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => setShowForm(!showForm);

    return (
        <section>
            <button onClick={handleShowForm}>Додати завдання</button>
            {showForm && <TaskForm />}
        </section>
    );
}

export default TaskController;