import { useState } from "react";
function CheckboxTask({ task, updateTask, children }) {
    const [checked, setChecked] = useState(false);
    const handleUpdateTask = () => {
        setChecked(!checked);

        updateTask(task.id, { complete: !task.complete });
    };
    return (
        <>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleUpdateTask}
            />
            <span>{children}</span>
        </>
    );
}

export default CheckboxTask;
