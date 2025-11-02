import { useState, useContext, useMemo } from "react";
import { UserContext } from "../../context/context";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
function JournalInput({ sendRequest, loading }) {

    const [name, setName] = useState("");
    const { user } = useContext(UserContext);

    const randomColor = useMemo(() => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }, []);

    const handleAddJournal = async () => {
        try {
            await sendRequest('POST', `/journals`, {
                nameJournal: name.toString(),
                author: user.displayName || user.email,
                color: randomColor
            });
            setName("");
        } catch (err) {
            alert('Помилка при додаванні блоку!', err);
        }
    };
    return (
        <section>
            <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                color="success"
                id="name"
                label="Назва блоку"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button loading={loading} color="success" size="small" variant="contained" onClick={handleAddJournal} name="addJournal">
                Додати блок
            </Button>
        </section>
    );
}

export default JournalInput;
