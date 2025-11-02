import { useContext } from "react";
import { UserContext } from "../context/context";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./navigation/NavBar";
import { Box, CssBaseline } from "@mui/material";

const ProtectedRoute = () => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
            <CssBaseline />
            <Outlet />
            <NavBar />
        </Box>
    );
};

export default ProtectedRoute;
