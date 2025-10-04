import TextItem from "./TextItem";
function Ol({ items }) {
    return (
        <ol>
            {items.map((item) => (
                <li key={item.itemId}>
                    <TextItem item={item} />
                </li>
            ))}
        </ol>
    );
}

export default Ol;
