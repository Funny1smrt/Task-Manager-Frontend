import Button from "../basicsComponents/Button";
import Text from "../basicsComponents/Text";
function OlTask({ task }) {
    return (
        <>
            <li>
                <Text t={task} />
            </li>
        </>
    );
}

export default OlTask;
