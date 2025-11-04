import useApiData from "../../hooks/useApiData";
import Task from "./Task";
import { Stack, Typography, CircularProgress, List } from "@mui/material";
function TaskList() {
    const { data: tasks, loading: taksLoading } = useApiData("/tasks", []);
    const { data: notes, loading: notesLoading } = useApiData("/notes?isTask=true", []);

    return (
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", pb: 7 }}>
        < Stack spacing = { 2} >

            <Typography variant="h5" component="div" color="primary">Завдання</Typography>
            {taksLoading && notesLoading && < CircularProgress />}
            {notes?.length !== 0 && notes?.map((task) => <Task key={task._id} task={task} />)}
            {tasks?.map((task) => (
                <Task key={task._id} task={task} />
            ))}
            {tasks?.length === 0 && notes?.length === 0 && !taksLoading && !notesLoading && <Typography>Завдань немає</Typography>}
            </Stack>
        </List>
    );
}

export default TaskList;