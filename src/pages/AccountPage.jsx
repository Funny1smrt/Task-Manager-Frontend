import { UserContext } from "../context/context";
import { useState, useContext } from "react";
import LogoutButton from "../components/ui/AuthButtons/LogoutButton";
import useApiData from "../hooks/useApiData";
import { Link } from "react-router-dom";
import { Grid, Button, Typography, Avatar, ButtonBase, ButtonGroup, Badge, Divider, CircularProgress, Container } from '@mui/material'
function AccountPage() {
    const { user } = useContext(UserContext);
    const { data: notes } = useApiData("/notes?allNotes=true");
    const { data: journals } = useApiData("/journals");
    // Assuming 'data: avatar' from this hook is the URL of the current avatar
    const { data: avatarUrl, sendRequest, loading } = useApiData("/avatars");
    const [, setSelectedFile] = useState(null);

    // 🚀 Обробник завантаження файлу
    const handleUpload = async (e) => {
        const fileToUpload = e.target.files[0]; // 👈 Correct: Get the file directly
        setSelectedFile(fileToUpload); // Update state (asynchronously)

        if (!fileToUpload) return; // 👈 Correct: Check the local variable

        try {
            const formData = new FormData();
            formData.append("file", fileToUpload); // 👈 Correct: Append the local variable

            // 🔐 якщо бекенд перевіряє токен — додаємо його
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("Token not found. Cannot upload avatar.");
                return;
            }

            // The 'sendRequest' function should handle setting the 'Content-Type' correctly for FormData.
            const res = await sendRequest("POST", "/avatars/upload", formData, token);

            console.log("Відповідь:", res.data);

            // You might need to trigger a refetch of the avatar here if your hook doesn't do it automatically, 
            // or update the user context with the new avatar URL from the response (res.data).

        } catch (error) {
            console.error("Помилка завантаження:", error);
        }
    };

    return (
        <Container style={{ height: '100%', padding: '20px' }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100%' }}
                direction="column"
            >
                <Grid direction="row" style={{ width: '100%' }} size={12}>
                    <ButtonBase
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        aria-label="Avatar image"
                        sx={{
                            borderRadius: '40px',
                            '&:has(:focus-visible)': {
                                outline: '2px solid',
                                outlineOffset: '2px',
                            },
                        }}
                    >
                        {/* Use 'avatarUrl' from the hook OR 'user.avatar' as fallback */}
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={

                                loading ? (
                                    <CircularProgress color="inherit" size={20} />
                                ) : null
                            }
                        >
                            <Avatar alt={user.name || user.email} src={avatarUrl.url || user.avatar} sx={{ width: 100, height: 100 }} />
                        </Badge>
                        <input
                            type="file"
                            accept="image/*"
                            style={{
                                border: 0,
                                clip: 'rect(0 0 0 0)',
                                height: '1px',
                                margin: '-1px',
                                overflow: 'hidden',
                                padding: 0,
                                position: 'absolute',
                                whiteSpace: 'nowrap',
                                width: '1px',
                            }}
                            onChange={handleUpload}
                        />
                    </ButtonBase>
                    <Typography variant="h5" component="div" color="primary">
                        {user.name || user.email}
                    </Typography>
                </Grid>
                <Divider />
                <Grid direction="row" style={{ width: '100%' }} size={12}>
                    <Typography variant="h6" component="div" color="primary">
                        {user.description || "Немає опису"}
                    </Typography>
                </Grid>
                <Divider />

                <Grid direction="row" style={{ width: '100%' }} size={12}>
                    <Typography variant="h6" component="div" color="primary">
                        {notes.length} нотаток
                    </Typography>
                </Grid>
                <Divider />
                <Grid direction="row" style={{ width: '100%' }} size={12}>
                    <Typography variant="h6" component="div" color="primary">
                        {journals.length} журналів
                    </Typography>
                </Grid>
                <Divider />
                <ButtonGroup aria-label="outlined primary button group">
                    <Button component={Link} to="/account/edit" name="profile">Редагувати профіль</Button>
                    <LogoutButton />
                </ButtonGroup>
                <Button component={Link} to="/tags">Теги</Button>
                <Button>Статистика</Button>
                <Button component={Link} to="/settings">Налаштування</Button>


            </Grid >
        </Container>

    );
}

export default AccountPage;