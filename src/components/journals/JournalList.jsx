import { Link } from "react-router-dom";
function JournalList({ journals }) {

    return (
        <section>
            <h2>Мої блоки</h2>
            <ul>
                {journals.map((journal) => (
                    <Link to={`/journal/${journal._id}`} key={journal._id}>
                        <li style={{ backgroundColor: journal.color }}>
                            {journal.nameJournal} (Автор: {journal.author}) {journal._id}
                        </li>
                    </Link>
                ))}
                {journals.length === 0 && <p>Блоків немає</p>}
            </ul>
        </section>
    );
}

export default JournalList;
