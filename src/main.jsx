import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserProvider.jsx";
import { DraftProvider } from "./context/DraftProvider.jsx";
import App from "./App.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import Settings from "./pages/Settings.jsx";
import TaskManager from "./pages/TaskManager.jsx";
import Journal from "./pages/Journal.jsx";
import TagsPage from "./pages/TagsPage.jsx";
import EditTask from './components/tasks/EditTask.jsx';
import NotFound from "./pages/NotFound.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {
    ThemeProvider,
} from "@mui/material/styles";
import { theme } from "./lib/theme.js";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <StrictMode>
        <BrowserRouter>
            <UserProvider>
                <DraftProvider>
                    <ThemeProvider theme={theme}>

                        <Routes>
                            <Route element={<ProtectedRoute />}>
                                {/* Головна сторінка з блоками */}
                                <Route path="/" element={<App />} />
                                {/* Сторінка конкретного журналу (список нотаток) */}
                                <Route path="/journal/:id" element={<Journal />} />
                                {/* Сторінка акаунту користувача */}
                                <Route path="/account" element={<AccountPage />} />
                                {/* Сторінка керування завданнями */}
                                <Route path="/tasks" element={<TaskManager />} />
                                {/* Сторінка керування тегами */}
                                <Route path="/tags" element={<TagsPage />} />
                                {/* Сторінка налаштувань */}
                                <Route path="/settings" element={<Settings />} />
                                {/* Сторінка редагування завдання */}
                                <Route path="/tasks/:id/edit" element={<EditTask />} />
                            </Route>

                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </ThemeProvider>

                </DraftProvider>
            </UserProvider>
        </BrowserRouter>
    </StrictMode>,
);
