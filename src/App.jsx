import BlockInput from "./components/BlockInput.jsx";
import BlockList from "./components/BlockList.jsx";
import useApiData from "./hooks/useApiData.js";
function App() {
    const { data: blocks, sendRequest} = useApiData("/blocks", []);

    return (
        <main>
            <BlockInput sendRequest={sendRequest}/>
            <BlockList blocks={blocks}/>
        </main>
    );
}

export default App;
