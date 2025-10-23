
import CollapsibleJournal from "../notes/CollapsibleJournal";
import TaskProgress from "../TaskProgress";
function NoteList({ notes }) {

    return (
        <section>
            {notes?.map((note) => (
                <CollapsibleJournal
                    key={note._id}
                    title={note?._id}
                    progress={<TaskProgress note={note} />}
                    note={note}
                />

            ))}

        </section>
    );
}

export default NoteList;
