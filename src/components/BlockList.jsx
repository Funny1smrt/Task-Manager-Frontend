import useFirestore from "../hooks/useFirestore";
import BlockTasks from "./BlockTasks";
function BlockList() {
    const { data: blocks } = useFirestore("blocks");
    return (
        <section>
            {blocks.map((block) => (
                <BlockTasks key={block.id} block={block} />
            ))}
        </section>
    );
}

export default BlockList;
