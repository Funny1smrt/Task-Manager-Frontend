import TaskController from "../components/tasks/TaskController";
import TaskList from "../components/tasks/TaskList";
import Box from '@mui/material/Box';

function TaskManager() {
    // const { sendRequest } = useApiData("/tasks");

    return (
        <Box color="background.default" sx={{ p: 2 }}>
            <TaskController />
            <TaskList />
        </Box>
    );
}

export default TaskManager;