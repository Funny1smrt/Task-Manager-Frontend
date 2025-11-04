import { Box, Button, CssBaseline, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
function NotFound() {
    const navigate = useNavigate();
    return (
        <Box sx={{height: "100vh", p: 2, justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }} >
            <CssBaseline />
            <Typography variant="h6">На жаль сторінка не знайдена</Typography>
            <Button onClick={() => navigate(-1)}>Повернутися</Button>
            <Button onClick={() => navigate("/")}>На головну</Button>
        </Box>
        
    );
}

export default NotFound;