import useFirestore from "../hooks/useFirestore";
import TextTask from "./TypesTask/TextTask";
import CheckboxTask from "./TypesTask/CheckboxTask";
import OlTask from "./TypesTask/OlTask";
import UlTask from "./TypesTask/UlTask";
function TaskItem({ task }) {
    const { updateData: updateTask } = useFirestore("tasks");

    return (
        <section>
            {task.type === "text" && <TextTask task={task} key={task.id} />}
            {task.type === "checkbox" && (
                <>
                    <CheckboxTask task={task} updateTask={updateTask}>
                        <TextTask task={task} key={task.id} />
                    </CheckboxTask>
                </>
            )}
            {task.type === "ol" && (
                <OlTask>
                    <TextTask task={task} key={task.id} />
                </OlTask>
            )}
            {task.type === "ul" && (
                <UlTask>
                    <TextTask task={task} key={task.id} />
                </UlTask>
            )}
        </section>
    );
}

export default TaskItem;
