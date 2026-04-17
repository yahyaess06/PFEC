import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Importation de vos composants
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import PatientsList from "./PatientsList";
import Vaccination from "./Vaccination"; // Intégré
import MonPlanning from "./MonPlanning"; // Intégré
import Profil from "./Profil";
import ConsultationInfermier from "./ConsultationInfermier";
import HistoriqueInfermier from "./HistoriqueInfermier.jsx";

/**
 * Layout pour l'espace Infirmier
 * Gère la Sidebar et le scroll du contenu principal
 */
function InfirmierLayout({ children }) {
    const location = useLocation();

    // Extraction du segment actif pour la Sidebar (ex: 'dashboard')
    const activeRouteSegmentMatch = location.pathname.match(/[^/]+$/);
    let activeRouteSegment = 'dashboard';

    if (activeRouteSegmentMatch) {
        activeRouteSegment = activeRouteSegmentMatch[0];
        // Ajustement si le chemin est la racine du module
        if (activeRouteSegment === 'infirmier' || activeRouteSegment === '') {
            activeRouteSegment = 'dashboard';
        }
    }

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f4f8' }}>

            {/* Sidebar avec injection de la route active */}
            <Sidebar activePath={activeRouteSegment} />

            {/* Zone de contenu principale avec scroll fluide */}
            <main style={{
                flex: 1,
                padding: '0',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {children}
            </main>
        </div>
    );
}

/**
 * Routeur principal du module Infirmier
 */
export default function InfirmierRoutes() {
    return (
        <InfirmierLayout>
            <Routes>
                {/* Redirection initiale vers le tableau de bord */}
                <Route path="/" element={<Navigate to="dashboard" replace />} />

                {/* Définition des pages avec le style premium unifié */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profil" element={<Profil />} />
                {/* Gestion de la liste des patients */}
                <Route path="rendez-vous" element={<PatientsList />} />
                <Route path="consultation" element={<ConsultationInfermier />} />{/*zadt*/}
                {/* Gestion des vaccinations et stocks */}
                <Route path="vaccination" element={<Vaccination />} />
                <Route path="HistoriqueInfermier" element={<HistoriqueInfermier />} />

                {/* Planning hebdomadaire interactif */}
                <Route path="planning" element={<MonPlanning />} />

                {/* Gestion de l'erreur 404 dans l'espace infirmier */}
                <Route path="*" element={
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                        <h1 style={{ color: '#1e293b' }}>404</h1>
                        <p style={{ color: '#64748b' }}>Désolé, cette page n'existe pas dans l'espace infirmier.</p>
                    </div>
                } />
            </Routes>
        </InfirmierLayout>
    );
}