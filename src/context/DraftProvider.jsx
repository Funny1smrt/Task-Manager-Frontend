import { DraftContext } from "./context";
import { useState } from "react";
export function DraftProvider({ children }) {
    const [draft, setDraft] = useState([]);

    const addDraftItem = (noteId, type) => {
        const newDraftItem = {
            itemId: crypto.randomUUID(), // Використовуємо UUID для унікального ідентифікатора
            type: type,
            text: "",
            isDraft: true,
            noteId: noteId,
        };

        if (type === "checkbox") {
            newDraftItem.complete = false;
        }

        setDraft(prev => ([
            ...(prev),
            newDraftItem,
        ]));

    };

    const removeDraftItem = (noteId, itemId) => {
        setDraft(prev => (prev[noteId]?.filter(item => item.itemId !== itemId) || []));
    };

    return (
        <DraftContext.Provider value={{ draft, setDraft, removeDraftItem, addDraftItem }}>
            {children}
        </DraftContext.Provider>
    );
}
