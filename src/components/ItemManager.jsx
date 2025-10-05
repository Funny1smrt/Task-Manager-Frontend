import Button from "./basicsComponents/Button";
import { useContext } from "react";
import { DraftContext } from "../context/context";
function ItemManager({ note }) {
    const { setDraft } = useContext(DraftContext);

    const typeNotes = {
        text: "text",
        checkbox: "checkbox",
        ul: "ul",
        ol: "ol",
        // img: "img",
        // video: "video",
        // audio: "audio",
        // link: "link",
        // table: "table",
    };

    const handleAddDraftItem = (type) => {
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

    return (
        <section>
            {Object.keys(typeNotes).map((type) => (
                <Button
                    text={type}
                    onClick={() => handleAddDraftItem(type)}
                    name={type}
                    key={type}
                />
            ))}
        </section>
    );
}

export default ItemManager;
