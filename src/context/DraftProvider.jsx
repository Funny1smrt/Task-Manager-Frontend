import { DraftContext } from "./context";
import { useState } from "react";
export function DraftProvider({ children }) {
    const [draft, setDraft] = useState([]);

    const addDraftItem = (note, typeNotes, type) => {
        const newDraftItem = {
            itemId: crypto.randomUUID(), // Використовуємо UUID для унікального ідентифікатора
            type: typeNotes[type],
            text: "",
            isDraft: true,
            noteId: note?.id,
        };

        if (type === "checkbox") {
            newDraftItem.complete = false;
        }

        setDraft(prev => ({
            ...prev,
            [note.id]: [...(prev[note.id] || []), newDraftItem]
        }));

    };

    const removeDraftItem = (noteId, itemId) => {
        setDraft(prev => ({
            ...prev,
            [noteId]: (prev[noteId] || []).filter(item => item.itemId !== itemId)
        }));
    };

    return (
        <DraftContext.Provider value={{ draft, setDraft, removeDraftItem, addDraftItem }}>
            {children}
        </DraftContext.Provider>
    );
}
