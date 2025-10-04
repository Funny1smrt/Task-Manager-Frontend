import NoteList from "./NoteList";
import { useParams } from "react-router-dom";
import NoteManager from "./NoteManager";
function Block() {
    const { id } = useParams(); // отримуємо blockId з URL
    return (
        <section>
            <h2>Блок {id}</h2>
            {/* Тут уже твій NoteList, який бере activeBlock = id */}
            <NoteManager blockId={id} />
            <NoteList blockId={id} />
        </section>
    );
}

export default Block;
