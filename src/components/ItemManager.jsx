import Button from "./basicsComponents/Button";
import { useContext } from "react";
import { DraftContext } from "../context/context";
function ItemManager({ note }) {
    const { handleAddDraftItem } = useContext(DraftContext);

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
                <Button
                    text={type}
                    onClick={() => handleAddDraftItem(note, typeNotes, type)}
                    name={type}
                    key={type}
                />
            ))}
        </section>
    );
}

export default ItemManager;
