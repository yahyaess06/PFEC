// AdminGuard.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../services/authService.js";

export default function AdminGuard() {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/administration/loginadmin" replace state={{ from: location }} />;
    }

    return <Outlet />;
}