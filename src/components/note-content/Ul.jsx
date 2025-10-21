import TextItem from "./TextItem";
function Ul({ items }) {
    return (
        <ul>
            {items.map((item) => (
                <li key={item.itemId}>
                    <TextItem item={item} />
                </li>
            ))}
        </ul>
    );
}

export default Ul;
