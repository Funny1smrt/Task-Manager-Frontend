function Task({ task }) {
    return (
        <div style={{ textDecoration: task.isComplete ? "line-through" : "none", border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            {task.title}
            <progress value={task.isComplete ? 100 : 0}></progress>
        </div>
    );
}
    export default Task;