import useOnSnapshotFirestore from "../hooks/useOnSnapshotFirestore";
import { Link } from "react-router-dom";
function BlockList() {
    const { data: blocks } = useOnSnapshotFirestore("blocks", "*");

    return (
        <section>
            <h2>Мої блоки</h2>
            <ul>
                {blocks.map((block) => (
                    <Link to={`/block/${block.id}`} key={block.id}>
                        <li style={{ backgroundColor: block.color }}>
                            {block.nameBlock}
                        </li>
                    </Link>
                ))}
            </ul>
        </section>
    );
}

export default BlockList;
