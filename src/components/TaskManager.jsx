import useFirestore from "../hooks/useFirestore";
import { useContext } from "react";
import { UserContext, BlockContext } from "../context/context";
import Button from "./basicsComponents/Button";
function TaskManager({ blockId }) {
    const { addData: addTask } = useFirestore("tasks");
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
        const newTask = {
            author: user.displayName || user.email,
            blockId: blockId,
            type: typeTasks[type],
            text: "",
        };

        if (type === "checkbox") {
            newTask.complete = false;
        }

        addTask(newTask);
    };

    return (
        <section>
            {Object.keys(typeTasks).map((type) => (
                <Button
                    text={type}
                    onClick={() => handleAddTask(type)}
                    name={type}
                    key={type}
                />
            ))}
        </section>
    );
}

export default TaskManager;
