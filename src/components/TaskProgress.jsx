import { useState, useEffect, useMemo } from "react";
import useApiData from "../hooks/useApiData";

function TaskProgress({ note }) {
    const [value, setValue] = useState(0);
    const [isProgress, setIsProgress] = useState(false);

    const noteId = note?._id;
    const isTask = note?.isTask || false;

    const endpoint = useMemo(() =>
        noteId ? `/note_components?noteId=${noteId}` : null,
        [noteId]
    );

    const { data: note_components, sendRequest } = useApiData(endpoint, []);

    useEffect(() => {
        if (!note_components || note_components.length === 0) {
            setIsProgress(false);
            setValue(0);
            return;
        }

        // Фільтруємо тільки checkbox елементи
        const checkableItems = note_components.filter(
            (item) => item.type === "checkbox"
        );

        const totalTasks = checkableItems.length;

        if (totalTasks === 0) {
            setIsProgress(false);
            setValue(0);
            return;
        }

        // Показуємо прогрес тільки якщо це task
        if (totalTasks > 0 && isTask) {
            setIsProgress(true);
        }

        // Рахуємо виконані завдання
        const completedTasks = checkableItems.filter(
            (item) => item.complete === true
        ).length;

        // Обчислюємо відсоток
        const newProgressValue = Math.round(
            (completedTasks / totalTasks) * 100
        );

        setValue(newProgressValue);
    }, [note_components, isTask]);

    const handleToggleTask = async () => {
        if (!noteId) return;

        const listItems = note_components || [];
        const checkableItems = listItems.filter(
            (item) => item.type === "checkbox"
        );

        const totalTasks = checkableItems.length;

        // Якщо є checkbox елементи і це ще не task - робимо task
        if (!isTask && totalTasks > 0) {
            try {
                await sendRequest('PUT', `/notes/${noteId}`, {
                    isTask: true,
                });
                console.log("✅ Нотатку перетворено в завдання");
            } catch (error) {
                console.error("❌ Помилка при створенні завдання:", error);
            }
        }
    };

    return (
        <div style={{ marginBottom: "10px" }}>
            {!isTask && note_components.some(item => item.type === "checkbox") && (
                <>
                    <button
                        onClick={handleToggleTask}
                        style={{
                            padding: "5px 10px",
                            fontSize: "12px",
                            cursor: "pointer",
                            marginBottom: "5px",
                        }}
                    >
                        🎯 Зробити завданням
                    </button>
                    <hr />
                </>
            )}

            {isProgress && (
                <div style={{ marginTop: "10px" }}>
                    <progress
                        value={value || 0}
                        max="100"
                        style={{ width: "100%", height: "20px" }}
                    ></progress>
                    <span style={{ fontSize: "14px", marginLeft: "10px" }}>
                        {value || 0}%
                    </span>
                </div>
            )}
        </div>
    );
}

export default TaskProgress;