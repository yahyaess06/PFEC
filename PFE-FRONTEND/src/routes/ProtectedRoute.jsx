// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import {getUserRole} from "../services/authService.js";

export default function ProtectedRoute({ children,allowedRole }) {
    const token = localStorage.getItem("token");
    const role = getUserRole();

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    /*try {
        const dd = jwtDecode(token);
        const now = Date.now() / 1000;
        if (dd.exp < now) {
            localStorage.removeItem("token");
            return <Navigate to="/login" replace/>;
        }
        return children;

    }catch {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace/>;
    }*/
    if (allowedRole && role !== allowedRole) {
        // return <Navigate to="/login" replace />;
        return <Navigate to="/not-authorized" replace />;
    }
    return children;
}
