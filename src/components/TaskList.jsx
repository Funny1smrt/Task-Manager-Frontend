import useFirestore from "../hooks/useFirestore";
import TaskItem from "./TaskItem";
import {useContext} from "react";
import { BlockContext } from "../context/BlockContext";
function TaskList() {
    const { activeBlock } = useContext(BlockContext);
    const { data: tasks } = useFirestore("tasks");

    return (
        <section>
            <p>{activeBlock }</p>
            {tasks
                .filter((task) => task.blockId === activeBlock)
                .map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </section>
    );
}

export default TaskList;