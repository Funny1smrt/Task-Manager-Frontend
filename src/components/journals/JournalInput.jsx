import { useState, useContext, useMemo } from "react";
import { UserContext } from "../../context/context";
import Input from "../ui/Input";


function JournalInput({ sendRequest }) {

    const [name, setName] = useState("");
    const { user } = useContext(UserContext);

    const randomColor = useMemo(() => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }, []);

    const handleAddJournal = async () => {
        try {
            await sendRequest('POST', `/journals`, {
                nameJournal: name.toString(),
                author: user.displayName || user.email,
                color: randomColor
            });
            setName("");
        } catch (err) {
            alert('Помилка при додаванні блоку!', err);
        }
    };
    return (
        <section>
            <Input
                type="text"
                name="name"
                value={name}
                setChange={setName}
                placeholder="Введіть назву блоку"
            />
            <button onClick={handleAddJournal} name="addJournal">
                Додати блок
            </button>
        </section>
    );
}

export default JournalInput;
