import AddTaskIcon from '@mui/icons-material/AddTask';
import TaskForm from "./TaskForm";
import ModalController from "../ui/ModalController";
import { useState } from "react";

function TaskController() {
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => setShowForm(!showForm);
    const actions = [
        {
            icon: <AddTaskIcon />,
            name: 'Add',
            handler: handleShowForm,
            component: <TaskForm showForm={showForm} handleShowForm={handleShowForm}/>
        },
    ];

    return (
        <ModalController actions={actions} />
    );
}

export default TaskController;