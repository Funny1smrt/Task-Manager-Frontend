import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

export default function LogoutButton() {
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await signOut(auth) // вихід з Firebase
            setUser(null) // очищення стану користувача у контексті
            navigate("/sign-in") // редірект на сторінку входу
        } catch (error) {
            console.error("Logout error:", error)
        }
    }

    return <button onClick={handleLogout}>Log Out</button>
}
