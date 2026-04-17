import api from "./api.js";

export function getMedecinProfile(){
    // const id = idMedecin();
    // if(id){
    //     return api.get(`/medecin/${id}`);
    // }
    return api.get("/medecin/profile");
}

export function updateMed(m){
    return api.put("/medecin/modifie",m);
}