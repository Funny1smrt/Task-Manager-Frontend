import Button from "../Button";
import { signInAnonymously} from "firebase/auth";
import { auth } from "../../../firebase";
import { UserContext } from "../../../context/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function SignWithAnonymously() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignInWithAnonymously = async () => {
        try {
            const result = await signInAnonymously(auth);
            const user = result.user;
            setUser(user);
            console.log("Signed in successfully");
            navigate("/");
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message);
        }
    };
    return (
        <Button
            text="Увійти без реєстрації"
            onClick={handleSignInWithAnonymously}
            name="signInWithGoogle"
        />
    );
}

export default SignWithAnonymously;
