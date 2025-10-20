import { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { UserContext } from "../../context/context";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/basicsComponents/Input";
import Button from "../../components/basicsComponents/Button";
import SignWithGoogleButton from "../../components/basicsComponents/AuthButtons/SignWithGoogleButton";
function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignInWithEmail = async () => {
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            setUser(result.user);
            const token = await result.user.getIdToken();
            localStorage.setItem('authToken', token);
            console.log("Signed in successfully");
            navigate("/"); // автоматично переходимо в додаток
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message);
        }
    };

    return (
        <main>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                text="Увійти"
                onClick={handleSignInWithEmail}
                name="signInWithEmail"
            />
            <SignWithGoogleButton />
            <hr />
            <p>
                Немає аккаунту? <Link to="/sign-up">Зареєструватися</Link>
            </p>
        </main>
    );
}

export default SignIn;
