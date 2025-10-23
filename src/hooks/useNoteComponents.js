import useApiData from "./useApiData";
import { useContext } from "react";
import { DraftContext } from "../context/context";
function useNoteComponents() {
    const { data: note_components, sendRequest } = useApiData(
        "/note_components",
        [],
    );
    const { removeDraftItem } = useContext(DraftContext);
    const addListItem = (draft, dataType, data) => {
        const targetItem = note_components.find(
            (item) =>
                item.noteId === draft.noteId && item.itemId === draft.itemId,
        );

        if (targetItem && targetItem._id) {
            // Оновлюємо існуючий компонент
            const { _id, ...rest } = { ...draft, [dataType]: data };
            sendRequest("PUT", `/note_components/${targetItem._id}`, rest);
        } else {
            // Створюємо новий компонент
            sendRequest("POST", `/note_components`, {
                ...draft,
                [dataType]: data,
                isDraft: false,
            }).then(() => {
                removeDraftItem(draft.noteId, draft.itemId);
            });
        }
    };

    // const removeListItem = (noteId, itemId) => {};
    // const handleUpdateListItem = (item, data, dataType) => {

    //     if(data === "") {
    //         removeListItem(targetNote.id, item.itemId);
    //         return;
    //     }
    //     let note_components;
    //     if (currentNote) {
    //         // 🔄 Оновлення існуючого елемента
    //         note_components = currentNote.list.map((i) =>
    //             i.itemId === item.itemId
    //                 ? { ...i, [dataType]: data, isDraft: false }
    //                 : i,
    //         );
    //     } else {
    //         // 🆕 Додавання нового елемента
    //         note_components = [
    //             ...(targetNote.list || []),
    //             { ...item, [dataType]: data, isDraft: false },
    //         ];
    //         removeDraftItem(targetNote.id, item.itemId);
    //     }

    //     sendRequest("PUT", `/notes?noteId=${targetNote.id}`, { note_components });
    // };

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

    return { addListItem, groupItemsByAdjacency };
}

export default useNoteComponents;
