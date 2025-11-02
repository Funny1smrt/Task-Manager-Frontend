import { useEffect } from "react";
import Button from "@mui/material/Button";
import { useColorScheme } from "@mui/material/styles";

function ModeToggle() {
    const { mode, setMode } = useColorScheme();

    // Обробка події зміни системної темии
    // При першому завантаженні сторінки читаємо тему з localStorage
    useEffect(() => {
        const savedMode = localStorage.getItem("themeMode");
        if (savedMode && savedMode !== mode) {
            setMode(savedMode);
        }
    }, [mode, setMode]);

    // Обробка перемикання теми
    const handleToggle = () => {
        console.log("Switching to", mode === "light" ? "dark" : "light", "mode");

        setMode((mode === "light" ? "dark" : "light"));
        localStorage.setItem("themeMode", mode === "light" ? "dark" : "light");
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            onClick={handleToggle}
            sx={{ mb: 2 }}
        >
            Switch to {mode === "light" ? "Dark" : "Light"} Mode
        </Button>
    );
}

export default ModeToggle;
