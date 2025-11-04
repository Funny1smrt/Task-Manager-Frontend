import { useContext, useMemo } from "react";
import { UserContext } from "../../context/context";
import { Button, Modal, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useApiData from "../../hooks/useApiData";

function JournalInput({ showInput, handleShowInput }) {

    const { user } = useContext(UserContext);
    const { data: journals, sendRequest } = useApiData("/journals", []);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const randomColor = useMemo(() => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }, []);

    const handleAddJournal = async (data) => {
        try {
            await sendRequest('POST', `/journals`, {
                title: data.title,
                author: user.displayName || user.email,
                color: randomColor
            });
            reset();
        } catch (err) {
            console.error(err);
        }
    };
    const handleClose = () => {
        reset();
        handleShowInput();
    };
    return (
        <Modal
            open={showInput} // Керується батьківським компонентом
            onClose={handleShowInput} // Закриття по кліку поза областю
            aria-labelledby="task-form-title"
            aria-describedby="task-form-description"
        >
            <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }} elevation={3}>
                <form onSubmit={handleSubmit(handleAddJournal)}>
                    <TextField
                        type="text"
                        label="Назва блоку"
                        fullWidth
                        margin="normal"
                        {...register("title", {
                            required: true, maxLength: 20,
                            validate: {
                                checkIsEmpty: (value) => value.trim() !== "",
                                checkIsAvailable: value => !journals.find(journal => (journal.title === value))
                            }
                        })}
                        error={!!errors.title}
                        helperText={errors.title ? "Назва обов'язкова, макс. 20 символів, унікальна та не порожня" : ""}
                    />
                    <Button color="success" size="small" variant="contained" type="submit" name="addJournal" disabled={!!errors.title}>
                        Додати
                    </Button>
                    <Button color="error" size="small" variant="outlined" onClick={handleClose}>
                        Скасувати
                    </Button>
                </form>
            </Paper>
        </Modal>
    );
}

export default JournalInput;
