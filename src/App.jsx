import JournalInput from "./components/journals/JournalInput.jsx";
import JournalList from "./components/journals/JournalList.jsx";
import useApiData from "./hooks/useApiData.js";
import NavBar from "./components/navigation/NavBar.jsx";
function App() {
    const { data: blocks, sendRequest, loading } = useApiData("/blocks", []);

    return (
        <>
            <main>
                {loading ? <p>...завантаження</p> :
                    <>
                        <JournalInput sendRequest={sendRequest} />
                        <JournalList blocks={blocks} />
                    </>}
            </main>
        </>


    );
}

export default App;
