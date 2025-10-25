import { useState, useEffect } from "react";
import useApiData from "../hooks/useApiData";

function TaskProgress({ note }) {
    // 💡 value має бути відсотком (0 до 100)

    const [value, setValue] = useState(0);
    const { sendRequest } = useApiData("/notes");
    const noteId = note?._id;
    const { data: note_components } = useApiData(
        noteId ? `/note_components?noteId=${noteId}` : null,
        []
    );
    

    let isTask = note?.isTask || false;

    const [isProgress, setIsProgress] = useState(false);

    useEffect(() => {


        // 1. Фільтруємо елементи типу 'checkbox', оскільки лише вони мають статус 'complete'.

        // Якщо ви використовуєте 'complete' для всіх типів, цей фільтр можна видалити.

        const checkableItems = note_components?.filter(
            (item) => item.type === "checkbox",
        );
        const totalTasks = checkableItems?.length;

        if (totalTasks === 0) {
            setIsProgress(false);
            setValue(0);
            return;
        }
        if (totalTasks !== 0 && isTask) {
            setIsProgress(true);
        }

        // 2. Рахуємо кількість виконаних завдань

        const completedTasks = checkableItems.filter(
            (item) => item.complete === true,
        ).length;

        // 3. Обчислюємо відсоток

        const newProgressValue = Math.round(
            (completedTasks / totalTasks) * 100,
        );

        // 4. Оновлюємо стан

        setValue(newProgressValue);
    }, [note_components, isTask]);

    const handleTask = (note) => {
        const listItems = note_components || [];

        // 1. Фільтруємо елементи типу 'checkbox', оскільки лише вони мають статус 'complete'.

        // Якщо ви використовуєте 'complete' для всіх типів, цей фільтр можна видалити.

        const checkableItems = listItems.filter(
            (item) => item.type === "checkbox",
        );

        const totalTasks = checkableItems.length;

        if (isTask === false && totalTasks !== 0) {
            sendRequest('PUT', `/notes/${note?._id}`, {
                isTask: true,
            });
        }
    };

    // Додатково: відображення відсотка поруч із прогрес-баром

    return (
        <div>
            <button onClick={() => handleTask(note)}>Зробити Task</button>

            <hr />

            {isProgress && (
                <div>
                    <progress value={value||0} min="0" max="100"></progress>

                    <span>{value||0}%</span>
                </div>
            )}

            <hr />
        </div>
    );
}

export default TaskProgress;
