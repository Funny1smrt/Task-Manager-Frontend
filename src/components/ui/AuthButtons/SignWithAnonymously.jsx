import useAuth from "../../../hooks/useAuth";
import Button from "@mui/material/Button";
function SignWithAnonymously() {
    const { handleSignInWithAnonymously } = useAuth();
    return (
        <Button
            onClick={handleSignInWithAnonymously}
            name="signInWithGoogle"
        >Увійти анонімно</Button>
    );
}

export default SignWithAnonymously;
