import { Box, TextField, Typography, Button, Backdrop, Modal, Paper } from "@mui/material"; // ⬅️ Додайте Modal та Paper
import useApiData from "../../hooks/useApiData";
import { useForm } from "react-hook-form";

// Стиль для центрування форми всередині Modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function TaskForm({ showForm, handleShowForm }) {
    const { data: tasks, sendRequest } = useApiData("/tasks");

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        sendRequest("POST", `/tasks`, data);
        console.log("Task added:", data);
        handleShowForm(); // ⬅️ Закриваємо форму після додавання
    };

    return (
        <Modal
            open={showForm} // Керується батьківським компонентом
            onClose={handleShowForm} // Закриття по кліку поза областю
            aria-labelledby="task-form-title"
            aria-describedby="task-form-description"
        >
            <Paper sx={style}>
                <Typography id="task-form-title" variant="h6" component="h2" gutterBottom>
                    Додати нове завдання
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        type="text"
                        label="Назва завдання"
                        fullWidth
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title ? "Назва обов'язкова, макс. 20 символів, унікальна та не порожня" : ""}
                        {...register("title", {
                            required: true, maxLength: 20, validate: {
                                isTrim: value => value.trim() !== "",
                                checkIsAvailable: value => !tasks.find(task => (task.title === value))
                            }
                        })}
                    />

                    <input {...register("isComplete", { value: false })} type="hidden" />

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outlined" onClick={handleShowForm}>
                            Скасувати
                        </Button>
                        <Button type="submit" variant="contained">
                            Додати завдання
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Modal>
    );
}

export default TaskForm;