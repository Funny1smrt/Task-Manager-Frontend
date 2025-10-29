// Ol.jsx
import TextItem from "./TextItem";
function Ol({ items, onAddAfter }) {
    return (
        <ol>
            {items.map((item) => (
                <li key={item.itemId}>
                    <TextItem item={item} onAddAfter={onAddAfter} />
                </li>
            ))}
        </ol>
    );
}

export default Ol;