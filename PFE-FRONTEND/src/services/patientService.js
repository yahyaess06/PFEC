import api from "./api.js";
import {idPatient} from "./authService.js";

export function getPatientProfile() {
    const id=idPatient();
    if(id){
    return api.get(`/patients/${id}`);
    }
}
export function putPatient(patient){
    return api.put("/patients/modifie",patient)
}
export function voirePatient(currentPage,s,c){
    return api.get("/PatientsMed",{
        params: { page: currentPage,nom: s,cin:c}}
)
}
