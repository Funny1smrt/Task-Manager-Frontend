import { Link } from "react-router-dom";
function BlockList({ blocks }) {

    return (
        <section>
            <h2>Мої блоки</h2>
            <ul>
                {blocks.map((block) => (
                    <Link to={`/block/${block._id}`} key={block._id}>
                        <li style={{ backgroundColor: block.color }}>
                            {block.nameBlock } (Автор: {block.author}) {block._id}
                        </li>
                    </Link>
                ))}
                {blocks.length === 0 && <p>Блоків немає</p>}
            </ul>
        </section>
    );
}

export default BlockList;
