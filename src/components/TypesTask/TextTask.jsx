import { useState, useRef, useEffect } from "react";
import useFirestore from "../../hooks/useFirestore";

function TextTask({ task, children }) {
    const { deleteData: deleteTask, updateData: updateTask } =
        useFirestore("tasks");

    const [updateText, setUpdateText] = useState(false);
    const [text, setText] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (updateText) {
            // Перевіряємо, чи інпут існує, і встановлюємо фокус
            inputRef.current?.focus();
        }
    }, [updateText]); // Залежність: запускати при зміні updateText

    const handleUpdateTask = () => {
        setUpdateText(true);
        setText(task.text);
    };
    // Обробник натискання клавіш (для Enter)
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Запобігаємо стандартній поведінці Enter (новому рядку)
            if (text?.length === 0) return;
            if (task.text !== text) {
                updateTask(task.id, { text: text });
            }
            setUpdateText(false);
        }
        if (text?.length === 0) {
            if (e.key === "Backspace") {
                e.preventDefault();
                deleteTask(task.id);
            }
        }
    };
    const handleBlur = () => {
        if (text?.length !== 0 && task.text !== text) {
            updateTask(task.id, { text: text });
        }

        setUpdateText(false);
    };

    return (
        <div>
            {children}
            {!updateText ? (
                <p
                    onClick={handleUpdateTask}
                    style={{ backgroundColor: task.complete ? "green" : "red" }}
                >
                    {task?.text || "Введіть завдання"}
                </p>
            ) : (
                <input
                    id={task.id}
                    type="text"
                    name="text"
                    ref={inputRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    onBlur={handleBlur}
                    placeholder="Введіть завдання"
                />
            )}
        </div>
    );
}

export default TextTask;
