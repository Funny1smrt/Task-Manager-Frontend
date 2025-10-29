import { useState } from "react";
import TextItem from "./TextItem";
import useNoteComponents from "../../hooks/useNoteComponents";

function Checkbox({ item, onAddAfter }) {
    const isChecked = item?.complete || false;
    const { addListItem } = useNoteComponents();
    const [isUpdating, setIsUpdating] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);

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
        <div
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                padding: "8px",
                borderRadius: "4px",
                transition: "background-color 0.2s",
                position: "relative",
            }}
            onMouseEnter={() => setShowAddButton(true)}
            onMouseLeave={() => setShowAddButton(false)}
        >
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
                <TextItem item={item} onAddAfter={null} />
            </div>

            {/* Кнопка додавання для checkbox */}
            {showAddButton && onAddAfter && (
                <button
                    onClick={() => onAddAfter(item)}
                    style={{
                        position: "absolute",
                        left: "50%",
                        bottom: "-15px",
                        transform: "translateX(-50%)",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: "2px solid #4CAF50",
                        backgroundColor: "white",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        color: "#4CAF50",
                        transition: "all 0.2s",
                        zIndex: 10,
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#4CAF50";
                        e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "white";
                        e.target.style.color = "#4CAF50";
                    }}
                >
                    +
                </button>
            )}
        </div>
    );
}

export default Checkbox;