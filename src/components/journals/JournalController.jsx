import NoteAddIcon from '@mui/icons-material/NoteAdd';
import JournalInput from "./JournalInput";

import ModalController from "../ui/ModalController";
import { useState } from "react";

function JournalController({ sendRequest }) {


    return (
        <ModalController actions={actions} />
    );
}

export default JournalController;