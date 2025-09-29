import useFirestore from "../hooks/useFirestore";
import TextTask from "./basicsComponents/Text";
import CheckboxTask from "./basicsComponents/Checkbox";
import OlTask from "./TypesTask/OlTask";
import UlTask from "./TypesTask/UlTask";
function TaskItem({ task }) {
    const { updateData: updateTask } = useFirestore("tasks");
    
    return (
        
    );
}

export default TaskItem;
