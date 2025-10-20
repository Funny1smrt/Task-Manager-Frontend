import { UserContext } from "../context/context";
import { useContext } from "react";
import LogoutButton from "../components/basicsComponents/AuthButtons/LogoutButton";
import useApiData from "../hooks/useApiData";
function AccountPage() {
    const { user } = useContext(UserContext);
    const { data: notes } = useApiData("/notes");
    const { data: blocks } = useApiData("/blocks");
    return (
        <main>
            <h1>{user.displayName||"Немає нікнейму"}</h1>
            <img src={user.photoURL} alt={user.displayName||"Немає фото"} />
            <p>{user.email}</p>
            <p>{user.creationTime}</p>
            <h2>Мої збереження</h2>
            <p>Нотаток: {notes?.length}</p>
            <p>Блоків: {blocks?.length}</p>
            <LogoutButton />
        </main>
    );
}

export default AccountPage;