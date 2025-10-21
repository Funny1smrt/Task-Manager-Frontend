import useApiData from "../../hooks/useApiData";
import useList from "../../hooks/useList";
import Ol from "../note-content/Ol";
import Ul from "../note-content/Ul";
import TextItem from "../note-content/TextItem";
import Checkbox from "../note-content/Checkbox";
import CollapsibleBlock from "../notes/CollapsibleBlock";
import TaskProgress from "../TaskProgress";
import { useContext } from "react";
import { DraftContext } from "../../context/context";
function NoteList() {
    const { data: notes } = useApiData("/notes", []);
    const { draft } = useContext(DraftContext);
    const { groupItemsByAdjacency } = useList();

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
        <section>
            {notes?.map((note) => (
                <CollapsibleBlock
                    key={note?._id}
                    title={note?.title}
                    progress={<TaskProgress note={note} />}
                >
                    <ItemManager note={note} />

                    {groupItemsByAdjacency(draft[note._id] || []).map((group, index) => (
                        <GroupRenderer
                            key={index}
                            group={group}
                            index={index}
                        />
                    ))}
                    {groupItemsByAdjacency(note?.list).map((group, index) => (
                        <GroupRenderer
                            key={index}
                            group={group}
                            index={index}
                        />
                    ))}
                </CollapsibleBlock>
            ))}

        </section>
    );
}

export default NoteList;
