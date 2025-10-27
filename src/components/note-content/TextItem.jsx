import { useState, useRef, useEffect } from "react";
import useNoteComponents from "../../hooks/useNoteComponents";

function TextItem({ item }) {
    const { addListItem } = useNoteComponents();
    const [text, setText] = useState(item?.text || "");
    const [activeUpdate, setActiveUpdate] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const inputRef = useRef(null);
    const timeoutRef = useRef(null);

    // Автоматична висота textarea
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

    // Синхронізуємо локальний стан з пропсами
    useEffect(() => {
        if (!activeUpdate) {
            setText(item?.text || "");
        }
    }, [item?.text, activeUpdate]);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const saveText = async () => {
        if (text === item?.text) {
            return; // Нічого не змінилось
        }

        setIsSaving(true);
        try {
            await addListItem(item, "text", text);
            console.log("✅ Текст збережено");
        } catch (error) {
            console.error("❌ Помилка збереження:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            saveText();
            setTimeout(() => setActiveUpdate(false), 100);
        }
    };

    const handleBlur = () => {
        // Затримка для збереження перед закриттям
        timeoutRef.current = setTimeout(() => {
            if (text !== item?.text) {
                saveText();
            }
            setActiveUpdate(false);
        }, 200);
    };

    // Очищення timeout
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div style={{ position: "relative" }}>
            {!activeUpdate ? (
                <div>
                    <p
                        onClick={() => setActiveUpdate(true)}
                        style={{
                            overflowWrap: "break-word",
                            cursor: "pointer",
                            padding: "8px",
                            border: "1px solid transparent",
                            borderRadius: "4px",
                            minHeight: "40px",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                    >
                        {item?.text || <span style={{ color: "#999" }}>Клацніть для редагування...</span>}
                    </p>
                </div>
            ) : (
                <div>
                    <textarea
                        wrap="hard"
                        value={text}
                        onChange={handleChange}
                        placeholder="Введіть текст..."
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        disabled={isSaving}
                        style={{
                            width: "100%",
                            overflow: "hidden",
                            minHeight: "40px",
                            resize: "none",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontFamily: "inherit",
                            opacity: isSaving ? 0.6 : 1,
                        }}
                    />
                    {isSaving && (
                        <span style={{
                            fontSize: "12px",
                            color: "#999",
                            position: "absolute",
                            right: "10px",
                            bottom: "5px",
                        }}>
                            Збереження...
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default TextItem;