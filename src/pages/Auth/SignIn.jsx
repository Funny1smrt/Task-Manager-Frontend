import { useState } from "react";
import {  Link } from "react-router-dom";
import SignWithGoogleButton from "../../components/basicsComponents/AuthButtons/SignWithGoogleButton";
import useAuth from "../../hooks/useAuth";
function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { handleSignInWithEmail } = useAuth();
   

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
            <button

                onClick={() => handleSignInWithEmail( email, password )}
                name="signInWithEmail"
            >Увійти</button>
            <SignWithGoogleButton />
            <hr />
            <p>
                Немає аккаунту? <Link to="/sign-up">Зареєструватися</Link>
            </p>
        </main>
    );
}

export default SignIn;
