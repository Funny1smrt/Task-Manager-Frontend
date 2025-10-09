import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserProvider.jsx";
import { DraftProvider } from "./context/DraftProvider.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Block from "./components/Block.jsx";
import App from "./App.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import DashboardLayout from "./pages/dashbord/DashboardLayout.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>

        <UserProvider>
            <DraftProvider>
                <Routes>
                    {/* Головна сторінка з блоками */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <DashboardLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/" element={<App />} />
                        {/* Сторінка конкретного блоку */}
                        <Route path="/block/:id" element={<Block />} />

                        {/* Сторінка аккаунту */}
                        <Route path="/account" element={<AccountPage />} />
                    </Route>

                    {/* Авторизація */}
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </DraftProvider>
        </UserProvider>
    </BrowserRouter>,
);
