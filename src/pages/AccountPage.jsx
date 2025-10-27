import { UserContext } from "../context/context";
import { useState } from "react";
import { useContext } from "react";
import LogoutButton from "../components/ui/AuthButtons/LogoutButton";
import useApiData from "../hooks/useApiData";

function AccountPage() {
    const { user } = useContext(UserContext);
    const { data: notes } = useApiData("/notes?allNotes=true");
    const { data: journals } = useApiData("/journals");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("");

    const { data: avatars, sendRequest } = useApiData("/avatars");
    // 📁 Обробник вибору файлу
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // 🚀 Обробник завантаження файлу
    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadMessage("Оберіть файл перед завантаженням!");
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", selectedFile);

            // 🔐 якщо бекенд перевіряє токен — додаємо його
            const token = localStorage.getItem("authToken");

            const res = await sendRequest("POST", "/avatars/upload", formData, token);

            setUploadMessage("✅ Аватар успішно завантажено!");
            console.log("Відповідь:", res.data);
        } catch (error) {
            console.error("Помилка при завантаженні:", error);
            setUploadMessage("❌ Помилка при завантаженні аватара");
        } finally {
            setUploading(false);
        }
    };

    return (
        <main>
            <h1>{user.displayName || "Немає нікнейму"}</h1>
            <img src={avatars?.url || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt={user.displayName + " avatar"} width={100} />
            <p>{user.email}</p>
            <p>{user.creationTime}</p>
            <h2>Мої збереження</h2>
            <p>Нотаток: {notes?.length}</p>
            <p>Блоків: {journals?.length}</p>
            <br />
            {/* 📁 Вибір файлу */}
            <input type="file" name="file" onChange={handleFileChange} />

            {/* 🚀 Кнопка завантаження */}
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Завантаження..." : "Завантажити аватар"}
            </button>

            <p>{uploadMessage}</p>
            <br />

            <LogoutButton />
        </main>
    );
}

export default AccountPage;