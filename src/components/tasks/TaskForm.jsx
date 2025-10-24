import useApiData from "../../hooks/useApiData";
import { useForm, Form } from "react-hook-form";

function TaskForm() {
    const { data: tasks, sendRequest } = useApiData("/tasks");

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        sendRequest("POST", `/tasks`, data);
        console.log("Task added:", data);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Назва завдання" {...register("title", {
                    required: true, maxLength: 20, validate: {
                        isTrim: value => value.trim() !== "",
                        checkIsAvailable: value => !tasks.find(task => (task.title === value
                        ))
                    }
            })} />
            {errors?.title?.type === "required" && <p>Поле обов'язкове</p>}
            {errors?.title?.type === "maxLength" && <p>Максимум 20 символів</p>}
            {errors?.title?.type === "isTrim" && <p>Поле не повинно бути порожнім</p>}
            {errors?.title?.type === "checkIsAvailable" && <p>Завдання з такою назвою вже існує</p>}
            <input {...register("isComplete", { value: false })} type="hidden" />
            <input type="submit" />
        </form>
    );
}

export default TaskForm;