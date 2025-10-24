import useApiData from "../../hooks/useApiData";
import Task from "./Task";
function TaskList() {
    const { data: tasks, loading } = useApiData("/tasks");
    const { data: notes } = useApiData("/notes?allNotes=true");
    console.log("🔹 notes у TaskList:", notes);
    const noteIsTask = notes?.filter(note=>note.isTask);
    return (
        <section>
            <h2>Список завдань</h2>
            {loading && <p>...завантаження</p>}
            {noteIsTask?.length !== 0 && noteIsTask?.map((task) => <Task key={task._id} task={task} />)}
            {tasks?.map((task) => (
                <Task key={task._id} task={task} />
            ))}
            {tasks?.length === 0 && <p>Завдань немає</p>}
        </section>
    );
}

export default TaskList;