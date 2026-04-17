import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Dashboard";
import Departements from "./Departements";
import Docteurs from "./Docteurs";
import Infirmieres from "./Infirmieres.jsx";
import RendezVous from "./RendezVous";
import ProfileAdmin from "./ProfileAdmin";
import AdminLogin from "./LoginAdmin.jsx";

import AdminGuard from "./AdminGuard";
import AdminLayout from "./AdminLayout";
import Historique from "../DOCTOR/Historique.jsx";
import Admins from "./Admins.jsx"
import {getUserRole} from "../../services/authService.js";

const AdministrationRoutes = () => {
    return (
        <Routes>
            {/* ✅ Login admin (public, sans sidebar) */}
            <Route path="loginadmin" element={<AdminLogin />} />

            {/* ✅ Tout le reste est protégé */}
            <Route element={<AdminGuard />}>
                <Route element={<AdminLayout />}>
                    {/* /admin -> /admin/dashboard */}
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="historique" element={<Historique />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<ProfileAdmin />} />
                    <Route path="departements" element={<Departements />} />
                    <Route path="doctors" element={<Docteurs />} />
                    <Route path="infirmieres" element={<Infirmieres />} />
                    <Route path="administateurs" element={<Admins />} />
                    <Route path="rendez-vous" element={<RendezVous />} />
                </Route>
            </Route>

            {/* fallback */}
            <Route path="*" element={<Navigate to="loginadmin" replace />} />
        </Routes>
    );
};

export default AdministrationRoutes;