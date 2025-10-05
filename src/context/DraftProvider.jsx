import { DraftContext } from "./context";
import { useState } from "react";
export function DraftProvider({ children }) {
    const [draft, setDraft] = useState([]);

    const removeDraftItem = (noteId, itemId) => {
        setDraft(prev => ({
            ...prev,
            [noteId]: (prev[noteId] || []).filter(item => item.itemId !== itemId)
        }));
    };

    return (
        <DraftContext.Provider value={{ draft, setDraft, removeDraftItem }}>
            {children}
        </DraftContext.Provider>
    );
}
