import useFirestore from "../hooks/useFirestore";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { BlockContext } from "../context/BlockContext";

function TaskManager() {
    const { addData: addTask } = useFirestore("tasks");
    const { activeBlock } = useContext(BlockContext);
    const { user } = useContext(UserContext);

    const typeTasks = {
        text: "text",
        checkbox: "checkbox",
        ul: "ul",
        ol: "ol",
        // img: "img",
        // video: "video",
        // audio: "audio",
        // link: "link",
        // table: "table",
    };
    const handleAddTask = (type) => {
        addTask({
            author: user.displayName || user.email,
            blockId: activeBlock,
            type: typeTasks[type],
        });
    };
    return (
        <section>
            {Object.keys(typeTasks).map((type) => (
                <button key={type} onClick={() => handleAddTask(type)}>
                    {type}
                </button>
            ))}
        </section>
    );
}

export default TaskManager;
