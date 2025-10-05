import { useState, useEffect } from "react";

import useFirestore from "../hooks/useFirestore";

function TaskProgress({ note }) {
    // 💡 value має бути відсотком (0 до 100)

    const [value, setValue] = useState(0);

    const { updateData: updateNote } = useFirestore("notes");

    const isTask = note?.isTask || false;

    const [isProgress, setIsProgress] = useState(false);

    useEffect(() => {
        const listItems = note?.list || [];

        // 1. Фільтруємо елементи типу 'checkbox', оскільки лише вони мають статус 'complete'.

        // Якщо ви використовуєте 'complete' для всіх типів, цей фільтр можна видалити.

        const checkableItems = listItems.filter(
            (item) => item.type === "checkbox",
        );

        const totalTasks = checkableItems.length;

        if (totalTasks !== 0) {
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
    }, [note?.list]); // 💡 Залежність лише від note?.list

    const handleTask = (note) => {
        const listItems = note?.list || [];

        // 1. Фільтруємо елементи типу 'checkbox', оскільки лише вони мають статус 'complete'.

        // Якщо ви використовуєте 'complete' для всіх типів, цей фільтр можна видалити.

        const checkableItems = listItems.filter(
            (item) => item.type === "checkbox",
        );

        const totalTasks = checkableItems.length;

        if (isTask !== note?.isTask && totalTasks !== 0) {
            updateNote(note?.id, {
                isTask: !isTask,
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
                    <progress value={value} min="0" max="100"></progress>

                    <span>{value}%</span>
                </div>
            )}

            <hr />
        </div>
    );
}

export default TaskProgress;
