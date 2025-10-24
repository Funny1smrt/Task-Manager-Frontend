import TaskController from "../components/tasks/TaskController";
import TaskList from "../components/tasks/TaskList";
// import useApiData from "../hooks/useApiData";

function TaskManager() {
    // const { sendRequest } = useApiData("/tasks");

    return (
        <section>
            <TaskController />
            <TaskList />
        </section>
    );
}

export default TaskManager;