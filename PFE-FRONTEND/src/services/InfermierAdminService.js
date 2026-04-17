import api from "./api";
import {idPatient} from "./authService.js";

export function getCountInfermier() {
    const id=idPatient();
    return api.get(`/infermiers/admin/${id}`);
}
export function voireInfermiers(page, cin, spec, nom, size = 5) {
    const id=idPatient();
    return api.get(`/infermiers/admin/infermiers/${id}`, {
        params: { nom, cin, spec, page, size },
    });
}
export function creerOuModifierInfermier(payload) {
    const id=idPatient();
    return api.post(`/infermiers/admin/creerinfermiers/${id}`, payload);
}
export function supprimerInfermier(idInfermier) {
    return api.delete(`/infermiers/admin/supprimerInfermier/${idInfermier}`);
}
export function voirInfermier(idInfermier) {
    return api.get(`/infermiers/admin/voirInfermier/${idInfermier}`);
}
export function voireSpecsInfermier() {
    return api.get(`/infermiers/admin/listSpecInfermier`);
}