import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInAnonymously,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { useContext } from "react";
import { UserContext } from "../context/context";
import { useNavigate } from "react-router-dom";

// import useApiData from "./useApiData";

const useAuth = () => {
    const { setUser } = useContext(UserContext);
    // const { sendRequest } = useApiData();
    const navigate = useNavigate();
    const handleSignInWithEmail = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            setUser(result.user);
            const idToken = await result.user.getIdToken(); // отримуємо токен Firebase Auth
            // Надсилаємо на бекенд
            const response = await fetch(
                "http://localhost:5000/api/users/auth",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken }),
                },
            );

            const data = await response.json();
            localStorage.setItem("authToken", data.jwt);
            console.log("Signed in successfully");
            navigate("/"); // автоматично переходимо в додаток
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message);
        }
    };
    const handleSignUpWithEmail = async (email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            setUser(result.user);
            const idToken = await result.user.getIdToken(); // отримуємо токен Firebase Auth
            // Надсилаємо на бекенд
            const response = await fetch(
                "http://localhost:5000/api/users/auth",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken }),
                },
            );

            const data = await response.json();
            localStorage.setItem("authToken", data.jwt);
            console.log("Signed in successfully");
            navigate("/"); // автоматично переходимо в додаток
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message);
        }
    };
    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            const idToken = await result.user.getIdToken(); // отримуємо токен Firebase Auth
            // Надсилаємо на бекенд
            const response = await fetch(
                "http://localhost:5000/api/users/auth",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken }),
                },
            );

            const data = await response.json();
            localStorage.setItem("authToken", data.jwt);
            console.log("Signed in successfully");
            navigate("/"); // автоматично переходимо в додаток
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message);
        }
    };
    const handleSignInWithAnonymously = async () => {
        try {
            const result = await signInAnonymously(auth);
            setUser(result.user);
            const idToken = await result.user.getIdToken(); // отримуємо токен Firebase Auth
            // Надсилаємо на бекенд
            const response = await fetch(
                "http://localhost:5000/api/users/auth",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken }),
                },
            );

            const data = await response.json();
            localStorage.setItem("authToken", data.jwt);
            console.log("Signed in successfully");
            navigate("/"); // автоматично переходимо в додаток
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message);
        }
    };
    return { handleSignInWithEmail, handleSignUpWithEmail, handleSignInWithGoogle, handleSignInWithAnonymously };
};

export default useAuth;
