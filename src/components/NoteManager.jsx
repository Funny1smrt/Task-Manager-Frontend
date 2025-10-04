import useFirestore from "../hooks/useFirestore";
import { useContext } from "react";
import { UserContext } from "../context/context";
import Button from "./basicsComponents/Button";
function NoteManager({ blockId }) {
    const { addData: addNote } = useFirestore("notes");
    const { user } = useContext(UserContext);

    const handleAddNote = () => {
        const newNote = {
            author: user.displayName || user.email,
            blockId: blockId,
            list: [],
        };

        addNote(newNote);
    };

    return (
        <section>
            <Button
                text="Додати"
                onClick={() => handleAddNote()}
                name="addNote"
            />
        </section>
    );
}

export default NoteManager;
