import useFirestore from "../hooks/useFirestore";
import { useState } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
function BlockInput() {
    const { addData: addBlock } = useFirestore("blocks");
    const [name, setName] = useState("");
    const { user } = useContext(UserContext);

    const randomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const handleAddBlock = () => {
        addBlock({
            nameBlock: name.toString(),
            author: user.displayName || user.email,
            color: randomColor(),
        });
        setName("");
    };
    return (
        <section>
            <input type="text" name="name" value={name || ""} onChange={(e) => setName(e.target.value)} placeholder="" />
            <button onClick={handleAddBlock}>Додати</button>

        </section>
    );
}

export default BlockInput;