import { useState, useContext } from "react";
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
    const noteComponentsHook = useApiData(
        noteId ? `/note_components?noteId=${noteId}` : null, // ✅ Виклик лише з дійсним ID
        []
    );
    const { data: note_components } = noteComponentsHook;

    const { draft } = useContext(DraftContext);
    const { groupItemsByAdjacency } = useNoteComponents();
    // Стан, який відстежує, чи блок відкритий (true) або закритий (false)
    const [isOpen, setIsOpen] = useState(true);
    // Функція, що перемикає стан
    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };
    // Функція, яка обирає компонент для рендерингу ГРУПИ
    const GroupRenderer = ({ group, index }) => {
        const type = group[0].type; // Тип всіх елементів у групі
        const key = `group-${index}-${type}`;

        // 💡 Логіка: Якщо тип 'ol', використовуємо Ol для нумерації всієї групи.
        if (type === "ol") {
            // Ol повинен приймати масив елементів для рендерингу <li>
            return <Ol key={key} items={group} />;
        }
        if (type === "ul") {
            return <Ul key={key} items={group} />;
        }

        // 💡 Для інших типів (checkbox, text), рендеримо їх окремо, оскільки вони не потребують спільної обгортки (окрім загального <div>)
        return (
            <>
                {group.map((item) => {
                    if (type === "checkbox") {
                        return <Checkbox key={item.itemId} item={item} />;
                    }
                    if (type === "text") {
                        return <TextItem key={item.itemId} item={item} />;
                    }
                    return null;
                })}
            </>
        );
    };
    return (
        <section
            style={{
                border: "1px solid black",
                padding: "10px",
                margin: "10px",
            }}
        >
            {/* 1. Заголовок: область для натискання */}
            {progress}
            <button onClick={toggleCollapse}>
                {title}

                {/* Символ для візуальної підказки (стрілка) */}
                <span className="icon">{isOpen ? "▲" : "▼"}</span>
            </button>

            {/* 2. Контент: відображається, якщо блок відкритий */}

            {isOpen &&
                <>
                    <ItemManager noteId={note?._id} />
                <hr />
                <p>Всі не збережені:</p>
                    {groupItemsByAdjacency(draft).map((group, index) => (
                        <GroupRenderer
                            key={index}
                            group={group}
                            index={index}
                        />
                    ))}
                <hr />
                <p>Всі збережені:</p>
                    {groupItemsByAdjacency(note_components).map((group, index) => (
                        <GroupRenderer
                            key={index}
                            group={group}
                            index={index}
                        />
                    ))}
                </>}
        </section>
    );
}

export default CollapsibleJournal;
