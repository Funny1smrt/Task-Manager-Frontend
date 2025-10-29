import JournalInput from "./components/journals/JournalInput.jsx";
import JournalList from "./components/journals/JournalList.jsx";
import useApiData from "./hooks/useApiData.js";
function App() {
    const { data: journals, sendRequest, loading } = useApiData("/journals", []);

    return (
        <>
            <main>
                {loading ? <p>...завантаження</p> :
                    <>
                        <JournalInput sendRequest={sendRequest} />
                        <JournalList journals={journals} />
                    </>}
            </main>
        </>


    );
}

export default App;
