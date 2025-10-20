import useApiData from "../hooks/useApiData";
import { useContext } from "react";
import { UserContext } from "../context/context";
import Button from "./basicsComponents/Button";
function NoteManager({ blockId }) {
    const { sendRequest } = useApiData("/notes", []);
    const { user } = useContext(UserContext);

    const handleAddNote = async () => {
        const newNote = {
            author: user.displayName || user.email,
            blockId: blockId,
            list: [],
        };

        try {
            console.log("Adding note:", newNote);
            const result = await sendRequest('POST', `/notes`, newNote); // чекаємо на виконання
            console.log("Note added:", result);
        } catch (error) {
            console.error("Помилка додавання нотатки:", error);
        }
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
