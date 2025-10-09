function Button({ text, onClick, name }) {
    return (
        <button onClick={onClick} name={name}   >
            {text}
        </button>
    );
}

export default Button;
