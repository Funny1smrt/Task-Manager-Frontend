import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useContext } from "react";
import { UserContext } from "../../../context/context";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
export default function LogoutButton() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth); // вихід з Firebase
            setUser(null); // очищення стану користувача у контексті
            navigate("/login"); // редірект на сторінку входу
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return <Button text="Log Out" onClick={handleLogout} name="logout" />;
}
