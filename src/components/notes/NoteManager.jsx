import { useContext } from "react";
import { UserContext } from "../../context/context";
// import Button from "../ui/Button";
function NoteManager({ journalId, sendRequest }) {
    const { user } = useContext(UserContext);

    const handleAddNote = async () => {
        const newNote = {
            author: user.displayName || user.email,
            journalId: journalId,
            title: "Нова нотатка",
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
            <button
                onClick={() => handleAddNote()}
                name="addNote"
            >Додати нотатку</button>
        </section>
    );
}

export default NoteManager;
