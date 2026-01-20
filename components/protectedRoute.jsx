import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({children, requiresAuthentication}, ) => {
    const isAuth = Boolean(localStorage.getItem("token"));
    console.log("isAuth:", isAuth); // Debugging line
    console.log("requiresAuthentication:", requiresAuthentication);
    if (!isAuth && requiresAuthentication) {
        return <Navigate to="/" replace />;
    }
    return children;
}