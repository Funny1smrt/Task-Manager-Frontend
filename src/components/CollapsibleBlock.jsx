import { useState } from "react";

function CollapsibleBlock({ title, children, progress }) {
    // Стан, який відстежує, чи блок відкритий (true) або закритий (false)
    const [isOpen, setIsOpen] = useState(false);
    // Функція, що перемикає стан
    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };
    return (
        <section
            style={{
                border: "1px solid black",
                padding: "10px",
                margin: "10px",
            }}
        >
            {/* 1. Заголовок: область для натискання */}
            {progress}
            <button onClick={toggleCollapse}>
                {title}

                {/* Символ для візуальної підказки (стрілка) */}
                <span className="icon">{isOpen ? "▲" : "▼"}</span>
            </button>

            {/* 2. Контент: відображається, якщо блок відкритий */}

            {isOpen && children}
        </section>
    );
}

export default CollapsibleBlock;
