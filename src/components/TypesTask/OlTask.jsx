import TextTask from "./TextTask";
function OlTask({ children }) {
    return (
        <>
            <ol>
                <li>{children}</li>
            </ol>
        </>
    );
}

export default OlTask;
