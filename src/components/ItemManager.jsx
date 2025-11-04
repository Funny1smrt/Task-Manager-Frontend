import { useContext } from "react";
import { DraftContext } from "../context/context";
import { ButtonGroup, Button } from "@mui/material";
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
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            {typeNotes.map((type) => (
                <Button
                    variant="outlined"
                    onClick={() => addDraftItem(noteId, type)}
                    name={type}
                    key={type}
                >{type}</Button>
            ))}
        </ButtonGroup>
    );
}

export default ItemManager;
