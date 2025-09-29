import { useState, useRef, useEffect } from "react";
import Input from "./Input";
import useFirestore from "../../hooks/useFirestore";
function Text({ t }) {
    const { updateData: updateTask } = useFirestore("tasks");
    const [activeUpdate, setActiveUpdate] = useState(false);
    const [text, setText] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (activeUpdate) {
            // Перевіряємо, чи інпут існує, і встановлюємо фокус
            inputRef.current?.focus();
        }
    }, [activeUpdate]); // Залежність: запускати при зміні updateText

    const handleUpdateTask = () => {
        setActiveUpdate(true);
        setText(t?.text);
    };
    // Обробник натискання клавіш (для Enter)
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Запобігаємо стандартній поведінці Enter (новому рядку)
            if (text?.length === 0) return;
            // if (t?.list?.text !== text) {
            updateTask(t?.id, { text: text });
            // }
            setActiveUpdate(false);
        }
        // if (text?.length === 0) {
        //     if (e.key === "Backspace") {
        //         e.preventDefault();
        //         deleteTask(task.id);
        //     }
        // }
    };
    const handleBlur = () => {
        if (text?.length !== 0) {
            updateTask(t?.id, { text: text });
        }

        setActiveUpdate(false);
    };

    return (
        <div>
            {!activeUpdate ? (
                <p onClick={handleUpdateTask}>
                    {t?.text || "Введіть завдання"}
                </p>
            ) : (
                <input
                    type="text"
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Введіть завдання"
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                />
            )}
        </div>
    );
}

export default Text;
