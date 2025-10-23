import { useContext } from "react";
import { DraftContext } from "../context/context";
function ItemManager({ noteId }) {
    const { addDraftItem } = useContext(DraftContext);

    const typeNotes = [
        "text",
        "checkbox",
        "ul",
        "ol",
        // "img",
        // "video",
        // "audio",
        // "link",
        // "table",
    ];



    return (
        <section>
            {typeNotes.map((type) => (
                <button
                    onClick={() => addDraftItem(noteId, type)}
                    name={type}
                    key={type}
                >{type}</button>
            ))}
        </section>
    );
}

export default ItemManager;
