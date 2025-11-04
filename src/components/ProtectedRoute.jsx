import { useRef, useContext, useState } from "react";
import { UserContext } from "../context/context";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./navigation/NavBar";
import { Box, CssBaseline, Backdrop, CircularProgress } from "@mui/material";
import ModalController from "./ui/ModalController";

const ProtectedRoute = () => {
    const { user, loading } = useContext(UserContext);
    const container = useRef(null);

    if (loading) {
        return (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
            <CssBaseline />
            <Outlet />
            <Box ref={container} />
            <ModalController
                container={container}
            />
            <NavBar />
        </Box>
    );
};

export default ProtectedRoute;
