import useFirestore from "./useFirestore";

function useList() {
    const { data: notes, updateData: updateNote } = useFirestore("notes");
    const handleUpdateListItem = (item, data, dataType) => {
        const currentNote = notes?.find((n) =>
            n?.list?.some((l) => l.itemId === item.itemId),
        );
        if (!currentNote) {
            console.error(
                "Помилка: Батьківський документ не знайдено для елемента:",
                item.itemId,
            );
            return;
        }
        const updatedList = currentNote.list.map(
            (i) =>
                // ВИПРАВЛЕНО: Порівнюємо i.itemId з targetitemId
                i.itemId === item.itemId
                    ? { ...i, [dataType]: data } // Оновлюємо текст
                    : i, // Залишаємо без змін
        );

        if (data !== item[dataType]) {
            updateNote(currentNote.id, {
                list: updatedList,
            });
        }
    };

    /**
     * Групує суміжні елементи в масиві list за їхнім типом.
     * Наприклад: [ol, ol, checkbox, ol] -> [[ol, ol], [checkbox], [ol]]
     * @param {Array} list - Масив елементів списку (note.list).
     * @returns {Array} Масив груп, де кожна група містить елементи одного типу.
     */
    const groupItemsByAdjacency = (list) => {
        if (!list || list.length === 0) return [];

        const groups = [];
        let currentGroup = [];
        let currentType = null;

        list.forEach((item) => {
            // Якщо тип поточного елемента відрізняється від поточного типу групи,
            // або якщо це перша ітерація, починаємо нову групу.
            if (item.type !== currentType) {
                // Зберігаємо попередню групу (якщо вона не порожня)
                if (currentGroup.length > 0) {
                    groups.push(currentGroup);
                }
                // Починаємо нову групу
                currentType = item.type;
                currentGroup = [item];
            } else {
                // Додаємо елемент до поточної групи
                currentGroup.push(item);
            }
        });

        // Додаємо останню групу
        if (currentGroup.length > 0) {
            groups.push(currentGroup);
        }

        return groups;
    };

    return { handleUpdateListItem, groupItemsByAdjacency };
}

export default useList;
