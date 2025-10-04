import { useState, useRef, useEffect } from "react";
import useList from "../../hooks/useList";

function TextItem({ item }) {
    const { handleUpdateListItem } = useList();
    const [text, setText] = useState(item?.text || "");
    const [activeUpdate, setActiveUpdate] = useState(false);
    const inputRef = useRef(null);

    const adjustHeight = () => {
        const textarea = inputRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [text, activeUpdate]);

    useEffect(() => {
        if (activeUpdate) {
            inputRef.current?.focus();
        }
    }, [activeUpdate]);

    useEffect(() => {
        if (!activeUpdate) {
            setText(item?.text || "");
        }
    }, [item?.text, activeUpdate]);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    // Обробник натискання клавіш (для Enter)
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            // Додаємо перевірку на Shift+Enter, щоб дозволити новий рядок
            e.preventDefault();
            handleUpdateListItem(item, text, "text");
            setActiveUpdate(false);
        }
    };

    // Обробник втрати фокусу
    const handleBlur = () => {
        if (activeUpdate) {
            handleUpdateListItem(item, text, "text");
        }
        setActiveUpdate(false);
    };

    return (
        <div>
            {!activeUpdate ? (
                // Режим читання
                <div>
                    <p
                        onClick={() => setActiveUpdate(true)}
                        // readOnly
                        // Додайте тут стилі для режиму читання, щоб висота теж була динамічною
                        style={{ overflowWrap: "break-word" }}
                    >
                        {item?.text || "Введіть завдання"}
                    </p>
                    <hr />
                </div>
            ) : (
                // Режим редагування
                <textarea
                    wrap="hard"
                    type="text"
                    name="text"
                    value={text}
                    onChange={handleChange}
                    placeholder="Введіть завдання"
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    // Додайте початкову мінімальну висоту та приховайте скролбар
                    style={{
                        overflow: "hidden",
                        minHeight: "40px",
                        resize: "none",
                    }}
                />
            )}
        </div>
    );
}

export default TextItem;
