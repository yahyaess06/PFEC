import api from "./api";

export function getDossier(id) {
    return api.get(`/patient/historique-medical/${id}`);
}
