import { useContext } from "react";
import { UserContext } from "../context/context";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./navigation/NavBar";

const ProtectedRoute = () => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Outlet />
            {user && <NavBar />}
        </>
    );
};

export default ProtectedRoute;
