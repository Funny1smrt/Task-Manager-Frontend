import {  useState, useContext} from "react";
import useFirestore from "../hooks/useFirestore";
import { UserContext } from "../context/UserContext";
import { BlockContext } from "../context/BlockContext";

function TaskInput() {

    const { activeBlock } = useContext(BlockContext);
    const {
        // data: tasks,
        addData: addTask,
    } = useFirestore("tasks");
    const { user } = useContext(UserContext);
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleAddTask = () => {
        addTask({
            text: text.toString(),
            completed: false,
            author: user.displayName || user.email,
            blockId: activeBlock,
             });
        setText("");
    };

    return (
        <section>
            <input type="text" name="text" value={text || ""} onChange={handleChange} placeholder="Введіть завдання" />
            <button onClick={handleAddTask}>Додати</button>
        </section>
    );
}

export default TaskInput;