import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { useContext } from "react";
import { BlockContext } from "../context/BlockContext";
function BlockTasks({ block }) {
    const { activeBlock ,setActiveBlock } = useContext(BlockContext);
    return (
        <section style={{ backgroundColor: block.color }} onClick={() => setActiveBlock(block.id)}>
            <h2>{block.nameBlock}</h2>
            {activeBlock === block.id &&
                <>
                    <TaskInput />
                    <TaskList />
                </>


            }

        </section>
    );
}

export default BlockTasks;