import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserProvider.jsx";
import { DraftProvider } from "./context/DraftProvider.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Block from "./components/Block.jsx";
import App from "./App.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        
        <UserProvider>
            <DraftProvider>
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
                                <Block />
                            </ProtectedRoute>
                        }
                    />

                    {/* Авторизація */}
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </DraftProvider>
        </UserProvider>
    </BrowserRouter>,
);
