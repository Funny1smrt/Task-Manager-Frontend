import JournalList from "./components/journals/JournalList.jsx";
import Skeleton from "@mui/material/Skeleton";
import useApiData from "./hooks/useApiData.js";
import Box from "@mui/material/Box";
import JournalController from "./components/journals/JournalController.jsx";
export default function App() {
    const { data: journals, sendRequest, loading } = useApiData("/journals", []);

    return (
        <Box
            sx={{
                p: 2,
                bgcolor: "background.default",
                color: "text.primary",
                minHeight: "100vh",
            }}
        >
            {loading ? (
                <>
                    <Skeleton variant="rectangular" width="100%" animation="wave" />
                    <br />
                    <Skeleton variant="rectangular" width="100%" animation="wave" />
                    <br />
                    <Skeleton variant="rectangular" width="100%" animation="wave" />
                </>
            ) : (
                <JournalList journals={journals} />
            )}
            {/* <JournalController sendRequest={sendRequest} /> */}
        </Box>

    );
};

