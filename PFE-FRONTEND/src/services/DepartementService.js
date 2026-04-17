import api from "./api.js";
import {idPatient} from "./authService.js";

export function voireDepartements(currentPage) {
   const id=idPatient();
    return api.get(`/Departements/${id}`, {
        params: { page: currentPage}
    });
}

export function voiredeps(){
    const id=idPatient();
    return api.get(`/Departements/noms/${id}`)
}