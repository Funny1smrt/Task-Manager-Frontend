import NoteList from "../components/notes/NoteList";
import { useParams } from "react-router-dom";
import NoteManager from "../components/notes/NoteManager";
function Journal() {
    const { id } = useParams(); // отримуємо blockId з URL
    return (
        <section>
            <h2>Блок {id}</h2>
            {/* Тут уже твій NoteList, який бере activeJournal = id */}
            <NoteManager blockId={id} />
            <NoteList blockId={id} />
        </section>
    );
}

export default Journal;
