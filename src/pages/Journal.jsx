import NoteList from "../components/notes/NoteList";
import { useParams } from "react-router-dom";
import NoteManager from "../components/notes/NoteManager";
import useApiData from "../hooks/useApiData";
function Journal() {
    const { id } = useParams(); // отримуємо journalId з URL
    console.log("🔹 journalId у NoteList:", id);

    const { data: notes, sendRequest } = useApiData(`/notes?journalId=${id}`, []);
    return (
        <section>
            <h2>Блок {id}</h2>
            {/* Тут уже твій NoteList, який бере activeJournal = id */}
            <NoteManager journalId={id} sendRequest={sendRequest} />
            <NoteList notes={notes} />
        </section>
    );
}

export default Journal;
