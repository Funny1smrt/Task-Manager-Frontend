import { useContext } from "react";
import { UserContext } from "../../context/context";
import useApiData from "../../hooks/useApiData";
function NoteManager({ journalId }) {
    const { sendRequest } = useApiData();
    const { user } = useContext(UserContext);

    const handleAddNote = async () => {
        const newNote = {
            author: user.displayName || user.email,
            journalId: journalId,
            title: "Нова нотатка",
        };

        try {
            console.log("Adding note...");
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
