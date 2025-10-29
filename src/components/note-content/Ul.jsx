// Ul.jsx
import TextItem from "./TextItem";
function Ul({ items, onAddAfter }) {
    return (
        <ul>
            {items.map((item) => (
                <li key={item.itemId}>
                    <TextItem item={item} onAddAfter={onAddAfter} />
                </li>
            ))}
        </ul>
    );
}

export default Ul;