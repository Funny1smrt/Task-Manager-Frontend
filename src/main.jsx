import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserProvider.jsx";
import { DraftProvider } from "./context/DraftProvider.jsx";
import App from "./App.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import TaskManager from "./pages/TaskManager.jsx";
import Journal from "./pages/Journal.jsx";
import NotFound from "./pages/NotFound.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>

        <UserProvider>
            <DraftProvider>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        {/* Головна сторінка з блоками */}
                        <Route path="/" element={<App />} />
                        {/* Сторінка конкретного журналу (список нотаток) */}
                        <Route path="/journal/:id" element={<Journal />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/tasks" element={<TaskManager />} />
                    </Route>

                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </DraftProvider>
        </UserProvider>
    </BrowserRouter>,
);
