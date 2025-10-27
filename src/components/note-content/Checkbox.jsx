import { useState } from "react";
import TextItem from "./TextItem";
import useNoteComponents from "../../hooks/useNoteComponents";

function Checkbox({ item }) {
    const isChecked = item?.complete || false;
    const { addListItem } = useNoteComponents();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateComplete = async () => {
        if (isUpdating) return;

        const newState = !isChecked;
        setIsUpdating(true);

        try {
            await addListItem(item, "complete", newState);
            console.log("✅ Checkbox оновлено:", newState);
        } catch (error) {
            console.error("❌ Помилка оновлення checkbox:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "8px",
            borderRadius: "4px",
            transition: "background-color 0.2s",
        }}>
            <input
                type="checkbox"
                name="checked"
                checked={isChecked}
                onChange={handleUpdateComplete}
                disabled={isUpdating}
                style={{
                    marginTop: "12px",
                    cursor: isUpdating ? "not-allowed" : "pointer",
                    width: "18px",
                    height: "18px",
                }}
            />
            <div
                style={{
                    flexGrow: 1,
                    textDecoration: isChecked ? "line-through" : "none",
                    opacity: isChecked ? 0.6 : 1,
                    transition: "all 0.3s",
                }}
            >
                <TextItem item={item} />
            </div>
        </div>
    );
}

export default Checkbox;