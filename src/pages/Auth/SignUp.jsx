import { useState, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

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
            <button onClick={handleSignUpWithEmail}>Зареєструватися</button>
            <button onClick={handleSignInWithGoogle}>
                Увійти через Google
            </button>
            <hr />

            <p>
                Вже зареєстровані? <a href="/sign-in">Увійти</a>
            </p>
        </main>
    );
}

export default SignUp;
