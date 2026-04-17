import api from "./api";
import { idPatient } from "./authService";

// GET /Direction/admin/{id}
export function getCountAdmins() {
    const id = idPatient();
    return api.get(`/Direction/admin/${id}`);
}

// GET /Direction/admin/admins/{id}?nom=&cin=&page=&size=
export function voireAdmins(page, nom, cin, size = 5) {
    const id = idPatient();

    return api.get(`/Direction/admin/admins/${id}`, {
        params: { nom, cin, page, size },
    });
}


export function creerOuModifierAdmin(payload) {
    const id = idPatient();

    return api.post(`/Direction/admin/creeradmin/${id}`, payload);
}

// DELETE /Direction/admin/supprimeradmin/{idAdmin}
export function supprimerAdmin(idAdmin) {
    return api.delete(`/Direction/admin/supprimeradmin/${idAdmin}`);
}

// GET /Direction/admin/voiradmin/{idAdmin}
export function voirAdmin(idAdmin) {
    return api.get(`/Direction/admin/voiradmin/${idAdmin}`);
}