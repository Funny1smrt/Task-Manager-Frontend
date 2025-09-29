import useFirestore from "../hooks/useFirestore";
import { useState, useContext } from "react";
import { UserContext } from "../context/context";
import Input from "./basicsComponents/Input";
import Button from "./basicsComponents/Button";

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
            <Input
                type="text"
                name="name"
                text={name}
                setText={setName}
                placeholder="Введіть назву блоку"
            />
            <Button text="Додати" onClick={handleAddBlock} name="addBlock" />
        </section>
    );
}

export default BlockInput;
