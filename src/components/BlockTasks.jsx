import TaskList from "./TaskList";
import { useParams } from "react-router-dom";
import TaskManager from "./TaskManager";
function BlockTasks() {
    const { id } = useParams(); // отримуємо blockId з URL
    return (
        <section>
            <h2>Блок {id}</h2>
            {/* Тут уже твій TaskList, який бере activeBlock = id */}
            <TaskManager blockId={id} />
            <TaskList blockId={id} />
        </section>
    );
}

export default BlockTasks;
