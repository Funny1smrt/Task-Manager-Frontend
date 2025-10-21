import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SignWithAnonymously from "../../components/basicsComponents/AuthButtons/SignWithAnonymously";
import SignWithGoogleButton from "../../components/basicsComponents/AuthButtons/SignWithGoogleButton";
function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleSignUpWithEmail } = useAuth();

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
            <button
                onClick={() => handleSignUpWithEmail(email, password)}
                name="signUpWithEmail"
            >
                Зареєструватися
            </button>
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
