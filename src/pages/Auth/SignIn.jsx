import { useState, useContext } from "react"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../../firebase"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom"

function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSignInWithEmail = async () => {
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            )
            setUser(result.user)
            console.log("Signed in successfully")
            navigate("/") // автоматично переходимо в додаток
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message)
        }
    }

    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            setUser(user)
            console.log("Signed in successfully")
            navigate("/") // <-- також після входу через Google
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message)
        }
    }

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
            <button onClick={handleSignInWithEmail}>Увійти</button>
            <button onClick={handleSignInWithGoogle}>
                Увійти через Google
            </button>
            <hr />
            <p>
                Немає аккаунту? <a href="/sign-up">Зареєструватися</a>
            </p>
        </main>
    )
}

export default SignIn
