import useFirestore from "../hooks/useFirestore";
import OlTask from "./TypesTask/OlTask";
import Checkbox from "./basicsComponents/Checkbox";
import Text from "./basicsComponents/Text";
import useQueryConditions from "../hooks/useQueryConditions";

function TaskList({ blockId }) {
    const { conditions } = useQueryConditions("blockId", blockId);
    const { data: tasks } = useFirestore("tasks", conditions);

    const rendered = [];
    let tempOl = [];

    const flushOl = () => {
        if (tempOl.length > 0) {
            rendered.push(
                <ol key={Math.random()}>
                    {tempOl.map((task) => (
                        <li>
                            <Text t={task} key={task.id} />
                        </li>
                    ))}
                </ol>,
            );
            tempOl = [];
        }
    };

    for (const task of tasks) {
        if (task.type === "ol") {
            tempOl.push(task);
        } else {
            flushOl();
            if (task.type === "text") {
                rendered.push(<Text t={task} key={task.id} />);
            }
            if (task.type === "checkbox") {
                rendered.push(
                    <Checkbox t={task} key={task.id}>
                        <Text t={task} />
                    </Checkbox>,
                );
            }
            // можеш додати інші типи тут (ul, img, video...)
        }
    }

    flushOl(); // закриваємо останній список

    return (
        <section>
            <p>{blockId}</p>
            {rendered}
        </section>
    );
}

export default TaskList;
