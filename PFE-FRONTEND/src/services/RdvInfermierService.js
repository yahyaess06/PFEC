import api from "./api";

export const getRdvInfermier = async () => {
    return await api.get("/infermier/rdvs_infermier");
};

export const confirmerRdvInfermier = async (id) => {
    return await api.put(`/infermier/confirmer/${id}`);
};

export const annulerRdvInfermier = async (id) => {
    return await api.put(`/infermier/annuler/${id}`);
};

export const voireStsInfermier = async () => {
    return await api.get("/infermier/statistiques");
};

export const getDetailInfermier = async (id) => {
    return await api.get(`/infermier/rdv/${id}`);
};