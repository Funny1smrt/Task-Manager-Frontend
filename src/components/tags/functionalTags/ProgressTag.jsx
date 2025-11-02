import { Chip, CircularProgress } from "@mui/material";

function ProgressTag({ value }) {

    return (

        <Chip
            label={`Progress: ${value}%`}
            color="primary"
        >
            <CircularProgress variant="determinate" value={value} />
        </Chip>

    );
}
export default ProgressTag;