import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
function JournalList({ journals }) {
    const navigate = useNavigate();

    return (
        <section>
            <Typography variant="h5">Мої блоки</Typography>
            {journals.map((journal) => (
                <Card key={journal._id} sx={{ padding: '10px', margin: '10px 0', backgroundColor: journal.color, cursor: "pointer" }}
                    onClick={() => navigate(`/journal/${journal._id}`)}>
                    <Typography variant="h6" key={journal._id}  >
                        {journal.title}

                    </Typography>
                </Card>
                // <Link to={`/journal/${journal._id}`} key={journal._id}>
                //     <li style={{ backgroundColor: journal.color }}>
                //         {journal.nameJournal} (Автор: {journal.author}) {journal._id}
                //     </li>
                // </Link>
            ))}
            {journals.length === 0 && <Typography>Журналів немає</Typography>}
        </section>
    );
}

export default JournalList;
