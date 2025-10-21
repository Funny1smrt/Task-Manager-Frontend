import Button from "../Button";
import useAuth from "../../../hooks/useAuth";
function SignWithGoogleButton() {
    const { handleSignInWithGoogle } = useAuth();

    
    return (
        <Button
            text="Увійти через Google"
            onClick={handleSignInWithGoogle}
            name="signInWithGoogle"
        />
    );
}

export default SignWithGoogleButton;
