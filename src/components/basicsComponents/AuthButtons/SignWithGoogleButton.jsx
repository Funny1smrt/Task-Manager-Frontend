import Button from "../Button";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase";
import { UserContext } from "../../../context/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function SignWithGoogleButton() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            console.log("Signed in successfully");
            navigate("/"); // <-- також після входу через Google
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message);
        }
    };
    return (
        <Button
            text="Увійти через Google"
            onClick={handleSignInWithGoogle}
            name="signInWithGoogle"
        />
    );
}

export default SignWithGoogleButton;
