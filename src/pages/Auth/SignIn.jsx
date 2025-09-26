import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useState } from "react";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignInWithEmail = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Signed in successfully");
        } catch (error) {
            console.log(error);
        }
    };
    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            console.log("Signed in successfully");
        } catch (error) {
            console.log(error);
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
            <button onClick={handleSignInWithEmail}>Sign In with Email</button>
            <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
        </main>
    );
}

export default SignIn;