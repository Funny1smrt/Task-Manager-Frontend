import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SignWithAnonymously from "../../components/ui/AuthButtons/SignWithAnonymously";
import SignWithGoogleButton from "../../components/ui/AuthButtons/SignWithGoogleButton";
import { useForm } from "react-hook-form";
import { Box, Button, CssBaseline, TextField, Typography } from "@mui/material";
function Register() {

    const { handleSignUpWithEmail } = useAuth();
    const { register, handleSubmit } = useForm();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', p: 2 }} >
            <CssBaseline />
            <Typography variant="h4" gutterBottom>
                Реєстрація
            </Typography>
            <form onSubmit={handleSubmit(handleSignUpWithEmail)}>
                <TextField {...register("email")} label="Email" variant="outlined" margin="normal" fullWidth required />
                <TextField {...register("password")} label="Пароль" variant="outlined" margin="normal" type="password" fullWidth required />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Зареєструватися
                </Button>
            </form>
            <Typography variant="body2" gutterBottom>
                Є акаунт?{" "}
                <Button component={Link} to="/login" type="text">
                    Увійти
                </Button>
            </Typography>
            <SignWithGoogleButton />
            <SignWithAnonymously />
        </Box>


    );
}

export default Register;
