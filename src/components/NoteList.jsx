import Ol from "./basicsComponents/Ol";
import Ul from "./basicsComponents/Ul";
import Checkbox from "./basicsComponents/Checkbox";
import TextItem from "./basicsComponents/TextItem";
import ItemManager from "./ItemManager";
import useFirestore from "../hooks/useFirestore";
import useQueryConditions from "../hooks/useQueryConditions";
import useList from "../hooks/useList";
import CollapsibleBlock from "./CollapsibleBlock";
import TaskProgress from "./TaskProgress";
function NoteList({ blockId }) {
    const { conditions } = useQueryConditions("blockId", blockId);
    const { data: notes } = useFirestore("notes", conditions);
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
                    key={note?.id}
                    title={note?.title}
                    progress={<TaskProgress note={note} />}
                >
                    <ItemManager note={note} />

                    {/* ✅ ВИКОРИСТАННЯ НОВОЇ ЛОГІКИ ГРУПУВАННЯ */}
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
