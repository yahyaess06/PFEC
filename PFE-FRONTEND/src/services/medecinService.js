/*import axios from "axios";

const apiUrl = "http://localhost:9090/test/medcins";

export const getAllMedecins = () => {
    return axios.get(apiUrl);
};

export const getMedecinsBySpec = (spec) => {
    return axios.get(`${apiUrl}/specialite?spec=${spec}`);
};*/
import api from "./api";
import {idPatient} from "./authService.js";

// export function getAllMedecins() {
//     return api.get("/medecins");
// }
export function getAllMedecins(page = 0, size = 6) {
    return api.get(`/medecins?page=${page}&size=${size}`);
}

// export function getMedecinsBySpec(spec) {
//     return api.get(`/medecins/specialite`, {
//         params: { spec }
//     });
// }
export function getMedecinsBySpec(spec, page = 0, size = 6) {
    return api.get(`/medecins/specialite`, {
        params: { spec, page, size }
    });
}

//-----
export function getAllSpecialites() {
    return api.get('/medecins/specialites');
}
//-----

export function getCountMedecin(){
    const id=idPatient();
    return api.get(`/admin/${id}`)
}

export function getMedecinById(id) {
    return api.get(`/medecins/${id}`);
}


export function voireMedecins(currentPage,cin,spec,nom){
    const id=idPatient();
    return api.get(`/admin/medecins/${id}`,
        {
            params:{nom:nom,cin:cin,spec:spec,page:currentPage}
        })
}
export function creerMed(Form){
    const id=idPatient();
    return api.post(`/admin/creermedecins/${id}`,Form)
}

export function supMed(id){
    return api.delete(`/admin/suprimerMedecin/${id}`)
}
export function voirmed(id){
    return api.get(`/admin/VoireMed/${id}`)
}
