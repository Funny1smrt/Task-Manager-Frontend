import { Link } from "react-router-dom";
import { VscFileSubmodule, VscAccount, VscTasklist } from "react-icons/vsc";
function NavBar() {
    return (
        <section style={{ display: "flex", gap: "20px", position: "absolute", left: "10px", bottom: "10px" }}>
            <Link to="/">
                <VscFileSubmodule />
            </Link>
            <Link to="/account">
                <VscAccount />
            </Link>
            <Link to="/tasks">
                <VscTasklist />
            </Link>
            
        </section>
    );
}

export default NavBar;