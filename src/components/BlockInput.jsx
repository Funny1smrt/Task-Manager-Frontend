import useApiData from "../hooks/useApiData";
import { useState, useContext, useMemo } from "react";
import { UserContext } from "../context/context";
import Input from "./basicsComponents/Input";
import Button from "./basicsComponents/Button";

function BlockInput() {
    const { refetch, sendRequest } = useApiData('/blocks', []);

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

    const handleAddBlock = async () => {
        try {
            await sendRequest('POST', `/blocks`, {
                nameBlock: name.toString(),
                author: user.displayName || user.email,
                color: randomColor
            });
            // Після успішного додавання оновлюємо список
            refetch();
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
            <Button text="Додати" onClick={handleAddBlock} name="addBlock" />
        </section>
    );
}

export default BlockInput;
