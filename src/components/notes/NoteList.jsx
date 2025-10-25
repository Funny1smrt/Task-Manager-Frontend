
import CollapsibleJournal from "../notes/CollapsibleJournal";
import TaskProgress from "../TaskProgress";
function NoteList({ notes }) {

    return (
        <section>
            {notes?.map((note) => (
                <div key={note._id}>
                    {note?._id &&
                        (<CollapsibleJournal
                            key={note._id}
                            title={note?._id}
                            progress={<TaskProgress note={note} />}
                            note={note}
                        />)
                    }
                </div>



            ))}

        </section>
    );
}

export default NoteList;
