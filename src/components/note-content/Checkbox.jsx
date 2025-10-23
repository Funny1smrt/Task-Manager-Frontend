import TextItem from "./TextItem";
import useNoteComponents from "../../hooks/useNoteComponents";
function Checkbox({ item }) {
    const isChecked = item?.complete || false;
    const { addListItem } = useNoteComponents();

    const handleUpdateComplete = () => {
        const newState = !isChecked;
        addListItem(item, "complete", newState);
    };
    return (
        <div>
            <input
                type="checkbox"
                name="checked"
                checked={isChecked}
                onChange={handleUpdateComplete}
            />
            <span
                style={{
                    // Додайте тут стилі для візуального відображення статусу
                    textDecoration: isChecked ? "line-through" : "none",
                    opacity: isChecked ? 0.6 : 1,
                    marginLeft: "0.5rem", // Відступ від чекбоксу
                    flexGrow: 1, // Дозволяє тексту займати весь доступний простір
                }}
            >
                <TextItem item={item} />
            </span>
        </div>
    );
}

export default Checkbox;
