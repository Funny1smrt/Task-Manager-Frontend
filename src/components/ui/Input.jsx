function Input({ type, name, value, setChange, placeholder, ref, checked }) {
    return (
        <input
            type={type}
            name={name}
            checked={checked}
            value={value || ""}
            onChange={(e) => setChange(e.target.value)}
            placeholder={placeholder}
            ref={ref}
        />
    );
}

export default Input;
