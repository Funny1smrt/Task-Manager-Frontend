import { useContext, useCallback } from "react";
import useApiData from "./useApiData";
import { DraftContext } from "../context/context";

function useNoteComponents() {
    const { setDraft } = useContext(DraftContext);

    const { sendRequest } = useApiData("/note_components", [], { lazy: true });
    const addListItem = useCallback(
        async (item, dataType, data) => {
            try {
                // Якщо item вже має _id - оновлюємо існуючий
                if (item._id) {
                    const { _id, ...rest } = { ...item, [dataType]: data };
                    await sendRequest(
                        "PUT",
                        `/note_components/${item._id}`,
                        rest,
                    );
                    console.log("✅ Компонент оновлено");
                } else {
                    // Створюємо новий компонент
                    await sendRequest("POST", `/note_components`, {
                        ...item,
                        [dataType]: data,
                        isDraft: false,
                    });

                    // Видаляємо з draft після успішного створення
                    setDraft((prev) =>
                        prev.filter((d) => d.itemId !== item.itemId),
                    );
                    console.log("✅ Компонент створено");
                }
            } catch (error) {
                console.error("❌ Помилка при збереженні компонента:", error);
                throw error;
            }
        },
        [sendRequest, setDraft],
    );

    const removeListItem = useCallback(
        async (componentId) => {
            try {
                await sendRequest("DELETE", `/note_components/${componentId}`);
                console.log("✅ Компонент видалено");
            } catch (error) {
                console.error("❌ Помилка при видаленні компонента:", error);
                throw error;
            }
        },
        [sendRequest],
    );

    /**
     * Групує суміжні елементи за типом
     * @param {Array} list - Масив елементів
     * @returns {Array} Масив груп
     */
    const groupItemsByAdjacency = useCallback((list) => {
        if (!list || list.length === 0) return [];

        const groups = [];
        let currentGroup = [];
        let currentType = null;

        list.forEach((item) => {
            if (item.type !== currentType) {
                if (currentGroup.length > 0) {
                    groups.push(currentGroup);
                }
                currentType = item.type;
                currentGroup = [item];
            } else {
                currentGroup.push(item);
            }
        });

        if (currentGroup.length > 0) {
            groups.push(currentGroup);
        }

        return groups;
    }, []);

    return { addListItem, removeListItem, groupItemsByAdjacency };
}

export default useNoteComponents;
