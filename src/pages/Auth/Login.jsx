import {  Link } from "react-router-dom";
import SignWithGoogleButton from "../../components/ui/AuthButtons/SignWithGoogleButton";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Box, Button, CssBaseline, TextField, Typography } from "@mui/material";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { handleSignInWithEmail } = useAuth();


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', p: 2 }} >
            <CssBaseline />
            <Typography variant="h4" gutterBottom>
                Вхід
            </Typography>
            <form onSubmit={handleSubmit((data) => handleSignInWithEmail(data))}>
                <TextField {...register("email", {
                    required: true, validate: {
                        isEmail: (value) => value.includes("@"),
                        minLength: (value) => value.length > 5,
                    }
                })} label="Email" variant="outlined" margin="normal" fullWidth required
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField {...register("password")} label="Пароль" variant="outlined" margin="normal" type="password" fullWidth required/>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Увійти
                </Button>
            </form>
            <Typography variant="body2" gutterBottom>
                Немає акаунту?{" "}
                <Button component={Link} to="/register" type="text">
                    Зареєструватися
                </Button>
            </Typography>
            <SignWithGoogleButton />
        </Box>

        
    );
}

export default Login;
