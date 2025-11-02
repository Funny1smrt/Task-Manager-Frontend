import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
function JournalList({ journals }) {

    return (
        <section>
            <Typography variant="h5">Мої блоки</Typography>
            {journals.map((journal) => (
                <Card key={journal._id} sx={{ padding: '10px', margin: '10px 0', backgroundColor: journal.color }}>
                    <Typography variant="h6" key={journal._id}>
                        <Link to={`/journal/${journal._id}`} >
                            {journal.nameJournal}
                        </Link>
                    </Typography>
                </Card>
                // <Link to={`/journal/${journal._id}`} key={journal._id}>
                //     <li style={{ backgroundColor: journal.color }}>
                //         {journal.nameJournal} (Автор: {journal.author}) {journal._id}
                //     </li>
                // </Link>
            ))}
            {journals.length === 0 && <p>Блоків немає</p>}
        </section>
    );
}

export default JournalList;
