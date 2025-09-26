// components/ProtectedRoute.jsx
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext)

    if (loading) {
        return <div>Loading...</div>
    }
    if (!user) {
        return <Navigate to="/sign-in" replace />
    }

    return children
}

export default ProtectedRoute
