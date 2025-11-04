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
import { API_URL } from "../lib/constants";
import useApiData from "./useApiData";

const useAuth = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { sendRequest } = useApiData("/users");
    // Функція для збереження токену
    const handleSaveToken = async (result) => {
        const idToken = await result.user.getIdToken(); // отримуємо токен Firebase Auth
        // Надсилаємо на бекенд
        const response = await fetch(`${API_URL}/users/auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
        });

        const data = await response.json();
        localStorage.setItem("authToken", data.jwt); // зберігаємо токен в localStorage
        console.log("Signed in successfully");
    };

    // Увійти з Firebase за допомогою email та паролем
    const handleSignInWithEmail = async (data) => {
        const { email, password } = data;
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            setUser(result.user);
            const userDataToSend = {
                uid:result.user.uid,
            };
            console.log(userDataToSend);
            sendRequest('POST', `/users`, userDataToSend);
            handleSaveToken(result);
            navigate("/"); // автоматично переходимо в додаток
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message);
        }
    };

    // Реєстрація з Firebase за допомогою email та паролем
    const handleSignUpWithEmail = async (data) => {
        const { email, password } = data;
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            setUser(result.user);
            handleSaveToken(result);
            navigate("/"); // автоматично переходимо в додаток
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message);
        }
    };

    // Увійти з Firebase за допомогою Google
    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            handleSaveToken(result);
            navigate("/"); // автоматично переходимо в додаток
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message);
        }
    };

    const handleSignInWithAnonymously = async () => {
        try {
            const result = await signInAnonymously(auth);
            setUser(result.user);
            handleSaveToken(result);
            navigate("/"); // автоматично переходимо в додаток
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message);
        }
    };
    return {
        handleSignInWithEmail,
        handleSignUpWithEmail,
        handleSignInWithGoogle,
        handleSignInWithAnonymously,
    };
};

export default useAuth;
