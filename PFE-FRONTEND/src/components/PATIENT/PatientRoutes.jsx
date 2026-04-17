// src/components/PATIENT/PatientRoutes.jsx

import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; 

// Importation des composants de page
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Doctors from "./Doctors";
import PrendreRDV from "./PrendreRDV";
import MesRendezVous from "./MesRendezVous";
import Historique from "./Historique";
import ProfilPatient from "../ProfilPatient.jsx";
import MoroccanHospitalNetwork from "./HospitalList.jsx";

/**
 * Composant de mise en page (Layout) pour l'espace patient.
 * Gère l'affichage de la Sidebar, l'état actif des liens et le défilement du contenu.
 */
function PatientLayout({ children }) {
    
    // 1. Obtenir l'objet de localisation actuel pour déterminer la route active
    const location = useLocation();
    
    // 2. Déterminer le segment de chemin actif pour mettre en surbrillance l'élément dans la Sidebar
    
    // Extrait le dernier segment de l'URL (ex: 'prendre-rdv' de '/patient/prendre-rdv')
    const activeRouteSegmentMatch = location.pathname.match(/[^/]+$/);
    
    // Valeur par défaut
    let activeRouteSegment = 'dashboard';

    if (activeRouteSegmentMatch) {
        activeRouteSegment = activeRouteSegmentMatch[0];
        
        // Si le chemin se termine par 'patient' ou si la racine est vide, on utilise 'dashboard'
        if (activeRouteSegment === 'patient' || activeRouteSegment === '') {
             activeRouteSegment = 'dashboard';
        }
    }
    
    const finalActivePath = activeRouteSegment || 'dashboard';
    
    return ( 
        // Le conteneur principal utilise 'h-screen' pour garantir que le scroll fonctionne sur <main>
        <div className="flex h-screen bg-gray-50"> 
            
            {/* Colonne 1 : Sidebar (Menu de navigation) */}
            <Sidebar activePath={finalActivePath} />
            
            {/* Colonne 2 : Contenu principal des pages */}
            <main className="flex-1 py-0 px-6 overflow-y-auto">
                {children}
            </main> 
        </div>
    ); 
}


/**
 * Composant principal de routage pour l'espace patient.
 * Enveloppe toutes les routes dans le layout PatientLayout.
 */
export default function PatientRoutes() {
    return (
        <PatientLayout>
            <Routes>
                {/* Routes relatives (montées sous /patient/* dans le Routeur global) */}
                
                {/* Route par défaut : /patient redirige vers /patient/dashboard */}
                <Route path="/" element={<Navigate to="dashboard" replace />} />
                
                {/* Routes des pages */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="prendre-rdv" element={<PrendreRDV />} />
                <Route path="mes-rdv" element={<MesRendezVous />} />
                <Route path="historique" element={<Historique />} />
                <Route path="/ProfilPatient" element={<ProfilPatient />} />
                <Route path="HospitalList" element={<MoroccanHospitalNetwork />} />

                {/* 404 personnalisé pour le module patient */}
                <Route path="*" element={<h1>404 - Page patient introuvable</h1>} />
            </Routes>
        </PatientLayout>
    );
}