import ProgressTag from "../tags/functionalTags/ProgressTag";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from "react-router-dom";
import Tag from "../tags/Tag.jsx";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));

function Task({ task }) {
    const navigate = useNavigate();

    return (
        <Item sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px" }} elevation={3}>

            {task.title}
            {task.progress &&
                <ProgressTag value={task.progress} />
            }
            {task.tags && task.tags.map((tag, index) => (
                <Tag key={index} label={tag} />
            ))}
            <CreateIcon onClick={() => navigate(`/tasks/${task._id}/edit`)} />

        </Item>
    );
}
export default Task;