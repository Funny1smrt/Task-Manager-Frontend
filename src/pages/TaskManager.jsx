import TaskController from "../components/tasks/TaskController";
import TaskList from "../components/tasks/TaskList";
import { Box } from "@mui/material";
function TaskManager() {
    // const { sendRequest } = useApiData("/tasks");

    return (
        <Box color="background.default" sx={{ p: 2 }}>
            <TaskList />
            <TaskController />
        </Box>
    );
}

export default TaskManager;