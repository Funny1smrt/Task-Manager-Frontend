import useFirestore from "../hooks/useFirestore";
import TaskItem from "./TaskItem";
import {useContext} from "react";
import { BlockContext } from "../context/BlockContext";
import useQueryConditions from "../hooks/useQueryConditions";
function TaskList() {
    const { activeBlock } = useContext(BlockContext);
    const { conditions } = useQueryConditions("blockId", activeBlock);
    const { data: tasks } = useFirestore("tasks", conditions);

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