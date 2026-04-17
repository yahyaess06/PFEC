import api from "./api.js";
import {idPatient} from "./authService.js";

export function voireCounts() {
    const id = idPatient();
    return api.get(`/admin/dash/${id}`);
}
export function voirePourcentage(datec){
    const id=idPatient();
    return api.get(`/pourcentage/${id}`,{
        params:{date:datec}
    })
}