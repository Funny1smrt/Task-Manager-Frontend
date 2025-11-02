import useAuth from "../../../hooks/useAuth";
import Button from "@mui/material/Button";
function SignWithGoogleButton() {
    const { handleSignInWithGoogle } = useAuth();


    return (
        <Button
            onClick={handleSignInWithGoogle}
            name="signInWithGoogle"
        >Увійти з Google</Button>
    );
}

export default SignWithGoogleButton;
