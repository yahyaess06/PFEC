import api from "./api";

export const getRdvById = (rdvId) => {
    return api.get(`/medecin/rdv/${rdvId}`);
};
