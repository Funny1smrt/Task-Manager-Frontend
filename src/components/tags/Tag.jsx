import Chip from '@mui/material/Chip';


function Tag({ label, onClick }) {
    return (
        <Chip
            label={label}
            onClick={onClick}
            color="primary"
        />
    );
}   
export default Tag;