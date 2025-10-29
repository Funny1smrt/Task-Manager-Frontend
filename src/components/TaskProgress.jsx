import ProgressTag from "./tags/functionalTags/ProgressTag";
function TaskProgress({ note }) {
    const noteId = note?._id;
    const isTask = note?.isTask || false;

    return (
        <div style={{ marginBottom: "10px" }}>
            {isTask  && (
                <>
                    <hr />
                    <ProgressTag path={`/note_components?noteId=${noteId}`} />
                </>
            )}

            
        </div>
    );
}

export default TaskProgress;