import useFirestore from "../hooks/useFirestore";
import Button from "./basicsComponents/Button";
import { arrayUnion } from "firebase/firestore";
function ItemManager({ note }) {
    const { updateData: updateNote } = useFirestore("notes");

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
    const handleAddListItem = (type) => {
        const newListItem = {
            itemId: crypto.randomUUID(), // Використовуємо UUID для унікального ідентифікатора
            type: typeNotes[type],
            text: "",
        };

        if (type === "checkbox") {
            newListItem.complete = false;
        }

        updateNote(note?.id, {
            list: arrayUnion(newListItem),
        });
    };

    return (
        <section>
            {Object.keys(typeNotes).map((type) => (
                <Button
                    text={type}
                    onClick={() => handleAddListItem(type)}
                    name={type}
                    key={type}
                />
            ))}
        </section>
    );
}

export default ItemManager;
