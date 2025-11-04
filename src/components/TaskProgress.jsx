import { Box } from "@mui/material";
import ProgressTag from "./tags/functionalTags/ProgressTag";
function TaskProgress({ note }) {
    const noteId = note?._id;
    const isTask = note?.isTask || false;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {isTask  && (
                <>
                    <hr />
                    <ProgressTag path={`/note_components?noteId=${noteId}`} />
                </>
            )}

            
        </Box>
    );
}

export default TaskProgress;