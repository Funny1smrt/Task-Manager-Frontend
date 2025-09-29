import { useState } from "react";
import Input from "./Input";
import useFirestore from "../../hooks/useFirestore";
function Checkbox({ t, children }) {
    const { updateData: updateTask } = useFirestore("tasks");
    const [checked, setChecked] = useState(false);
    const handleUpdateTask = () => {
        setChecked(!checked);

        updateTask(t.id, { complete: !t?.complete });
    };
    return (
        <>
            <input
                type="checkbox"
                name="checked"
                checked={checked}
                onChange={handleUpdateTask}
            />
            <span>{children}</span>
        </>
    );
}

export default Checkbox;
