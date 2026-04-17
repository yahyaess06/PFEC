import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifyCode from "./components/auth/VerifyCode";
import ResetPassword from "./components/auth/ResetPassword"; // AJOUT de l'import manquant

// Main & Patient Components
import Principale from "./components/Principale.jsx";
import PatientRoutes from "./components/PATIENT/PatientRoutes";
import Dashboard from "./components/PATIENT/Dashboard.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import DoctorRoutes  from "./components/DOCTOR/DoctorRoutes.jsx";
import HospitalList from "./components/PATIENT/HospitalList.jsx";
import Vaccination from "./components/PATIENT/Vaccination.jsx";
// IMPORT DE LA NOUVELLE PAGE
import MaternitePage from "./components/PATIENT/MaternitePage.jsx";

// Specialized Routes
import AdministrationRoutes from "./components/ADMINISTRATION/AdministrationRoutes";
import InfirmierRoutes from "./components/INFIRMIER/InfirmierRoutes";
import OAuth2Redirect from "./components/auth/OAuth2Redirect.jsx";
import ConfirmationAcc from "./components/auth/ConfirmationAcc.jsx";
import NotAuthorized from "./components/NotAuthorizedPage/NotAuthorized.jsx";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Principale />} />
                <Route path="/login" element={<Login />} />
                {/* Accueil */}
                <Route path="/" element={<Principale />} />
                <Route path="/principale" element={<Principale />} />

                <Route path="/not-authorized" element={<NotAuthorized />} />{/*zadt had rout*/}

                {/* --- AUTHENTIFICATION --- */}
                <Route path="/login" element={<Login />} />
                <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
                <Route path="/verification" element={<ConfirmationAcc />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth/register" element={<Register />} />

                {/* Flux de récupération de mot de passe */}
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-code" element={<VerifyCode />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* --- ESPACE PATIENT --- */}
                <Route
                    path="/patient"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Routes Patient */}
                {/*<Route path="/patient/*" element={<PatientRoutes />} />*/}
                <Route
                    path="/patient/*"
                    element={
                        <ProtectedRoute allowedRole="PATIENT">
                            <PatientRoutes />
                        </ProtectedRoute>
                    }
                />
                <Route path="/patient/*" element={<PatientRoutes />} />
                <Route path="/HospitalList" element={<HospitalList />} />
                <Route path="/patient/vaccination" element={<Vaccination />} />
                <Route path="/patient/maternite" element={<MaternitePage />} />

                {/* --- AUTRES RÔLES --- */}
                {/*<Route path="/doctor/*" element={<DoctorRoutes />} />*/}
                {/*<Route path="/infirmier/*" element={<InfirmierRoutes />} />*/}
                <Route
                    path="/infirmier/*"
                    element={
                        <ProtectedRoute allowedRole="INFERMIER">
                            <InfirmierRoutes />
                        </ProtectedRoute>
                    }
                />
                <Route path="/administration/*" element={<AdministrationRoutes />} />
                {/*<Route path="/doctor/*" element={<DoctorRoutes />} />*/}
                <Route
                    path="/doctor/*"
                    element={
                        <ProtectedRoute allowedRole="MEDECIN">
                            <DoctorRoutes />
                        </ProtectedRoute>
                    }
                />

                {/* 404 */}
                <Route path="*" element={<h1>404 - Page introuvable</h1>} />
            </Routes>
        </Router>
    );
}