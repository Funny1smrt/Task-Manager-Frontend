import useFirestore from "./useFirestore";
import useOnSnapshotFirestore from "./useOnSnapshotFirestore";
import { useContext } from "react";
import { DraftContext } from "../context/context";
function useList() {
    const { updateData: updateNote } = useFirestore("notes");
    const { data: notes } = useOnSnapshotFirestore("notes", "*");
    const { removeDraftItem } = useContext(DraftContext);
    const handleUpdateListItem = (item, data, dataType) => {
        const currentNote = notes?.find((n) =>
            n?.list?.some((l) => l.itemId === item.itemId),
        );

        const targetNote =
            currentNote || notes?.find((n) => n.id === item.noteId);
        if (!targetNote) {
            console.error("❌ Не знайдено нотатку для елемента:", notes, item);
            return;
        }
        if(data === "") {
            removeListItem(targetNote.id, item.itemId);
            return;
        }
        let updatedList;
        if (currentNote) {
            // 🔄 Оновлення існуючого елемента
            updatedList = currentNote.list.map((i) =>
                i.itemId === item.itemId
                    ? { ...i, [dataType]: data, isDraft: false }
                    : i,
            );
        } else {
            // 🆕 Додавання нового елемента
            updatedList = [
                ...(targetNote.list || []),
                { ...item, [dataType]: data, isDraft: false },
            ];
            removeDraftItem(targetNote.id, item.itemId);
        }

        updateNote(targetNote.id, { list: updatedList });
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
    const removeListItem = (noteId, itemId) => {
        const targetNote = notes?.find((n) => n.id === noteId);
        if (!targetNote) {
            console.error("❌ Не знайдено нотатку для елемента");
            return;
        }
        const updatedList = targetNote.list.filter((i) => i.itemId !== itemId);
        updateNote(targetNote.id, { list: updatedList });
    };

    return { handleUpdateListItem, groupItemsByAdjacency };
}

export default useList;
