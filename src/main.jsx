import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserProvider.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import BlockTasks from "./components/BlockTasks.jsx";
import App from "./App.jsx";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <UserProvider>
            <Routes>
                {/* Головна сторінка з блоками */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <App />
                        </ProtectedRoute>
                    }
                />

                {/* Сторінка конкретного блоку */}
                <Route
                    path="/block/:id"
                    element={
                        <ProtectedRoute>
                            <BlockTasks />
                        </ProtectedRoute>
                    }
                />

                {/* Авторизація */}
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </UserProvider>
    </BrowserRouter>,
);
