import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UserProvider } from "./context/UserProvider.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import App from "./app"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"

const root = document.getElementById("root")

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <UserProvider>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <App />
                        </ProtectedRoute>
                    }
                />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </UserProvider>
    </BrowserRouter>,
)
