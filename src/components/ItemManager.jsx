import { useContext } from "react";
import { DraftContext } from "../context/context";
function ItemManager({ note }) {
    const { addDraftItem } = useContext(DraftContext);

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



    return (
        <section>
            {Object.keys(typeNotes).map((type) => (
                <button
                    onClick={() => addDraftItem(note, typeNotes, type)}
                    name={type}
                    key={type}
                >{type}</button>
            ))}
        </section>
    );
}

export default ItemManager;
