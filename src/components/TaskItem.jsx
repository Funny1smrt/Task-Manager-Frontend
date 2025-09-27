import  useFirestore  from "../hooks/useFirestore";
function TaskItem({ task }) {
    const { deleteData: deleteTask } = useFirestore("tasks");
    return (
        <section>
            <p>{task.text}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </section>
    );
}

export default TaskItem;