import useApiData from "../../hooks/useApiData";
import Task from "./Task";
import { Stack } from "@mui/material";
function TaskList() {
    const { data: tasks, loading: taksLoading } = useApiData("/tasks", []);
    const { data: notes, loading: notesLoading } = useApiData("/notes?isTask=true", []);

    return (
        < Stack spacing = { 2} >

            <h2>Список завдань</h2>
            {taksLoading && notesLoading && <p>...завантаження</p>}
            {notes?.length !== 0 && notes?.map((task) => <Task key={task._id} task={task} />)}
            {tasks?.map((task) => (
                <Task key={task._id} task={task} />
            ))}
            {tasks?.length === 0 && <p>Завдань немає</p>}
        </Stack>
    );
}

export default TaskList;