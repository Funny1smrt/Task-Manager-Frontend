import { useState, useContext } from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../firebase";
import { UserContext } from "../../context/context";
import { useNavigate, Link } from "react-router-dom";
import SignWithAnonymously from "../../components/basicsComponents/AuthButtons/SignWithAnonymously";
import SignWithGoogleButton from "../../components/basicsComponents/AuthButtons/SignWithGoogleButton";
import Button from "../../components/basicsComponents/Button";
function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUpWithEmail = async () => {
        try {
            // Створюємо користувача у Firebase Auth
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            // Оновлюємо контекст
            setUser(result.user);
            const token = await result.user.getIdToken();
            localStorage.setItem('authToken', token);
            // Переходимо на захищену сторінку
            navigate("/");
            console.log("User registered successfully");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                console.error("Email already in use");
            } else {
                console.error("Sign-up error:", error.code, error.message);
            }
        }
    };


    return (
        <main>
            <h2>Sign Up</h2>
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
                text="Зареєструватися"
                onClick={handleSignUpWithEmail}
                name="signUpWithEmail"
            />
            <SignWithAnonymously />
            <SignWithGoogleButton />

            <hr />

            <p>
                Вже зареєстровані? <Link to="/sign-in">Увійти</Link>
            </p>
        </main>
    );
}

export default SignUp;
