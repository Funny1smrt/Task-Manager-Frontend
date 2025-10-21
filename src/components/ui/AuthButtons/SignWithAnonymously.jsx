import Button from "../../ui/Button";
import useAuth from "../../../hooks/useAuth";
function SignWithAnonymously() {
    const { handleSignInWithAnonymously } = useAuth();
    return (
        <Button
            text="Увійти без реєстрації"
            onClick={handleSignInWithAnonymously}
            name="signInWithGoogle"
        />
    );
}

export default SignWithAnonymously;
