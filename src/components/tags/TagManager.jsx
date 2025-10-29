import { useCallback, useMemo } from "react";
import useApiData from "../../hooks/useApiData";
import { useForm } from "react-hook-form";

const TagManager = () => {
    const { data: tags, sendRequest } = useApiData("/tags", [], { lazy: false });
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log("Tags loaded:", tags);
    const handleAddTag = useCallback( async (tagName) => {
        try {
            const newTag = {
                name: tagName,
            };

            const result = await sendRequest("POST", `/tags`, newTag);
            console.log("Tag added:", result);
        } catch (error) {
            console.error("Помилка додавання тега:", error);
        }
    }, [sendRequest]);

    const handleDeleteTag = useCallback(async (tagId) => {
        try {
            const result = await sendRequest("DELETE", `/tags/${tagId}`);
            console.log("Tag deleted:", result);
        } catch (error) {
            console.error("Помилка видалення тега:", error);
        }
    }, [sendRequest]);

    const handleUpdateTag = useCallback( async (tagId, tagName) => {
        try {
            const updatedTag = {
                name: tagName,
            };

            const result = await sendRequest("PUT", `/tags/${tagId}`, updatedTag);
            console.log("Tag updated:", result);
        } catch (error) {
            console.error("Помилка оновлення тега:", error);
        }
    }, [sendRequest]);

    return useMemo(
        () => (
            <main>
                <section>
                    <form onSubmit={handleSubmit((data) => handleAddTag(data.tagName))}>
                        <input
                            type="text"
                            placeholder="Новий тег"
                            {...register("tagName", { required: true })}
                        />
                        {errors.tagName && <p>Поле обов'язкове</p>}
                        <button type="submit">Додати</button>
                    </form>
                </section>
                <br />
                <section>
                    {tags?.map((tag) => (
                        <div key={tag._id} className="tag-manager__tag">
                            <span>{tag.name}</span>
                            <button onClick={() => handleDeleteTag(tag._id)}>Видалити</button>
                            <hr />
                        </div>
                        
                    ))}
                </section>
            </main>
        ),
        [tags, handleAddTag, handleDeleteTag, handleSubmit, register, errors]
    );
};

export default TagManager;
