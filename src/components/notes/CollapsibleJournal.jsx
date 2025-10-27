import { useState, useContext, useMemo } from "react";
import { DraftContext } from "../../context/context";
import useNoteComponents from "../../hooks/useNoteComponents";
import useApiData from "../../hooks/useApiData";
import ItemManager from "../ItemManager";
import Ol from "../note-content/Ol";
import Ul from "../note-content/Ul";
import TextItem from "../note-content/TextItem";
import Checkbox from "../note-content/Checkbox";

function CollapsibleJournal({ note, title, progress }) {
    const noteId = note?._id;

    // ✅ КРИТИЧНЕ ВИПРАВЛЕННЯ: створюємо endpoint один раз
    const endpoint = useMemo(() => {
        // Якщо немає noteId - повертаємо null і не робимо запит
        if (!noteId) return null;
        return `/note_components?noteId=${noteId}`;
    }, [noteId]); // Залежить ТІЛЬКИ від noteId

    // Тепер useApiData викликається з стабільним endpoint
    const { data: note_components, loading } = useApiData(endpoint, []);
    const { draft } = useContext(DraftContext);
    const { groupItemsByAdjacency } = useNoteComponents();
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    // Компонент для рендерингу групи
    const GroupRenderer = ({ group, index }) => {
        const type = group[0]?.type;
        const key = `group-${index}-${type}`;

        if (type === "ol") {
            return <Ol key={key} items={group} />;
        }
        if (type === "ul") {
            return <Ul key={key} items={group} />;
        }

        return (
            <div key={key}>
                {group.map((item) => {
                    if (type === "checkbox") {
                        return <Checkbox key={item.itemId} item={item} />;
                    }
                    if (type === "text") {
                        return <TextItem key={item.itemId} item={item} />;
                    }
                    return null;
                })}
            </div>
        );
    };

    // ✅ Фільтруємо draft СТАБІЛЬНО
    const currentDraft = useMemo(() =>
        draft.filter(item => item.noteId === noteId),
        [draft, noteId]
    );

    // Якщо немає noteId - не рендеримо нічого
    if (!noteId) {
        return null;
    }

    return (
        <section
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px",
                borderRadius: "8px",
            }}
        >
            {progress}

            <button
                onClick={toggleCollapse}
                style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px",
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    fontSize: "16px",
                    fontWeight: "bold",
                }}
            >
                {title}
                <span style={{ float: "right" }}>
                    {isOpen ? "▲" : "▼"}
                </span>
            </button>

            {isOpen && (
                <>
                    <ItemManager noteId={noteId} />

                    {loading && <p>Завантаження...</p>}

                    {currentDraft.length > 0 && (
                        <>
                            <hr />
                            <p><strong>Не збережені:</strong></p>
                            {groupItemsByAdjacency(currentDraft).map((group, index) => (
                                <GroupRenderer key={`draft-${index}`} group={group} index={index} />
                            ))}
                        </>
                    )}

                    {note_components && note_components.length > 0 && (
                        <>
                            <hr />
                            <p><strong>Збережені:</strong></p>
                            {groupItemsByAdjacency(note_components).map((group, index) => (
                                <GroupRenderer key={`saved-${index}`} group={group} index={index} />
                            ))}
                        </>
                    )}

                    {!loading && (!note_components || note_components.length === 0) && currentDraft.length === 0 && (
                        <p style={{ color: "#999", fontStyle: "italic" }}>
                            Додайте перший елемент
                        </p>
                    )}
                </>
            )}
        </section>
    );
}

export default CollapsibleJournal;