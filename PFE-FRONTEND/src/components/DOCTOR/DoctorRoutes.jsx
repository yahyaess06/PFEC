import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorLayout from './DoctorLayout';
import Dashboard from './Dashboard';
import MonPlaning from './MonPlaning';
import MesRendezVous from './MesRendezVous';
import Consultation from './Consultation';
import Historique from './Historique';
import ProfilDoctor from "./ProfilDoctor";

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route element={<DoctorLayout />}>
        {/* Redirection automatique de /doctor vers /doctor/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="planning" element={<MonPlaning />} />
        <Route path="rendez-vous" element={<MesRendezVous />} />
        <Route path="consultation" element={<Consultation />} />
        {/*<Route path="consultation" element={<Consultation />} />*/}
        <Route path="historique" element={<Historique />} />
        <Route path="profildoctor" element={<ProfilDoctor />} />

      </Route>
    </Routes>
  );
};

export default DoctorRoutes;