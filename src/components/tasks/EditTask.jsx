import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Typography, Box, CircularProgress, Stack, Autocomplete, Chip } from "@mui/material";
import { Controller } from "react-hook-form";
import useApiData from "../../hooks/useApiData";
function EditTask() {
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: tasks, sendRequest, loading } = useApiData("/tasks", []);
    const { data: tags, loading: tagsLoading } = useApiData("/tags", [], { lazy: !open });

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            description: "",
            deadline: ""
        }
    });
    // 🔹 шукаємо завдання
    const currentTask = tasks?.find(task => String(task._id) === String(id));

    // 🔹 оновлюємо форму після завантаження
    useEffect(() => {
        if (currentTask) {
            console.log("Поточне завдання для редагування:", currentTask);
            reset({
                title: currentTask.title || "",
                description: currentTask.description || "",
                deadline: currentTask.deadline || "",
            });
        }
    }, [currentTask, reset]);


    // Збереження змін
    const onSubmit = (data) => {
        console.log("Збережено завдання:", data);
        sendRequest("PUT", `/tasks/${id}`, data);
        navigate("/tasks");
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            {loading ? <CircularProgress /> :
                <Paper sx={{ p: 3, width: 400 }} elevation={3}>
                    <Typography variant="h6" gutterBottom>
                        Редагувати завдання
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            required
                            label="Назва"
                            fullWidth
                            margin="normal"
                            {...register("title", { required: "Назва обов'язкова" })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />

                        <TextField
                            label="Опис"
                            fullWidth
                            multiline
                            rows={3}
                            margin="normal"
                            {...register("description")}
                        />

                            <Stack spacing={3} sx={{ width: 500 }}>

                                <Controller
                                    name="tags" // ⬅️ Назва поля, яке буде в даних форми (data.tags)
                                    control={control}
                                    defaultValue={currentTask?.tags || []} // ⬅️ Встановлюємо початкове значення
                                    render={({ field: { onChange, value } }) => (
                                        <Autocomplete
                                            multiple
                                            id="tags-filled"
                                            options={tags.map((option) => option.name)}
                                            freeSolo
                                            onOpen={() => { setOpen(true); }}
                                            onClose={() => { setOpen(false); }}
                                            loading={tagsLoading}

                                            // 💡 ОНОВЛЕННЯ 1: Поточне значення для Autocomplete беремо з Controller
                                            value={value}

                                            // 💡 ОНОВЛЕННЯ 2: При зміні викликаємо onChange з Controller
                                            onChange={(event, newValues) => {
                                                onChange(newValues); // Передаємо вибрані значення у react-hook-form
                                            }}

                                            renderValue={(selected) => (
                                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                    {selected.map((option, index) => (
                                                        // 💡 ОНОВЛЕННЯ 3: Використовуйте унікальніший ключ для Chip
                                                        <Chip key={option} label={option} variant="outlined" />
                                                    ))}
                                                </Box>
                                            )}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="filled"
                                                    label="Теги"
                                                    placeholder="Додати теги..."
                                                />
                                            )}
                                        />
                                    )}
                                />

                            </Stack>


                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                            <Button variant="outlined" onClick={() => navigate("/tasks")}>
                                Скасувати
                            </Button>
                            <Button variant="contained" color="primary" type="submit">
                                Зберегти
                            </Button>
                        </Box>
                    </form>
                </Paper>}
        </Box>
    );
}

export default EditTask;
