import api from "./api";

export const saveConsultation = (rdvId, data) => {
    return api.put(`/medecin/consultaion/${rdvId}`, data);
};

export const updateDossier = (patId, data) => {
    return api.put(`/medecin/dossier/${patId}`, data);
};

export const getDossierByPatient = (patId) => {
    return api.get(`/medecin/dossier/${patId}`);
};
