import { DraftContext } from "./context";
import { useState, useCallback } from "react";

export function DraftProvider({ children }) {
    const [draft, setDraft] = useState([]);

    const addDraftItem = useCallback((noteId, type) => {
        const newDraftItem = {
            itemId: crypto.randomUUID(),
            type: type,
            text: "",
            isDraft: true,
            noteId: noteId,
        };

        if (type === "checkbox") {
            newDraftItem.complete = false;
        }

        setDraft(prev => [...prev, newDraftItem]);
        console.log("✅ Додано draft елемент:", newDraftItem);
    }, []);

    const removeDraftItem = useCallback((noteId, itemId) => {
        setDraft(prev => prev.filter(
            item => !(item.noteId === noteId && item.itemId === itemId)
        ));
        console.log("🗑️ Видалено draft елемент:", { noteId, itemId });
    }, []);

    const clearDraftForNote = useCallback((noteId) => {
        setDraft(prev => prev.filter(item => item.noteId !== noteId));
        console.log("🗑️ Очищено всі draft для нотатки:", noteId);
    }, []);

    const updateDraftItem = useCallback((itemId, updates) => {
        setDraft(prev => prev.map(item =>
            item.itemId === itemId
                ? { ...item, ...updates }
                : item
        ));
    }, []);

    return (
        <DraftContext.Provider
            value={{
                draft,
                setDraft,
                addDraftItem,
                removeDraftItem,
                clearDraftForNote,
                updateDraftItem
            }}
        >
            {children}
        </DraftContext.Provider>
    );
}