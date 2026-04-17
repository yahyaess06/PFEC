import api from "./api.js";
import {idPatient} from "./authService.js";

export function getRdvs() {
    const id=idPatient();
    return api.get(`/Rendez_Vous/${id}`);
}
export function anulerRdv(id){
    return api.post(`/Rendez_Vous/annulation/${id}`)
}
export function voireRdv(id){
    return api.get(`/Rendezvous/rdv/${id}`);
}

export function confirmerRdv(id){
    return api.post(`/Rendez_Vous/confirmation/${id}`)
}


export function prdrdvVaccin(rdvdto){
    return api.post("/Rendezvous/prendreRdv/Vaccin",rdvdto)
}
export function voireVaccin(){
    const id=idPatient();
    return api.get(`/Rendez_Vous/Vaccins/${id}`);
}
export function voireVaccinDetails(id){
    return api.get(`/Rendezvous/rdvvaccin/${id}`)
}
export function voireStatistiques(){
    const id=idPatient();//id medcin normalement
    console.log(id);
    return api.get(`/Rendezvouscount/${id}`)
}
export function voireRdvParMedcin(){
    const id=idPatient();
    return api.get(`/Rendezvousbymedcin/${id}`)
}
export function voireRdvsAdmin(reqp={}){
    const id=idPatient();
    return api.post(`/admin/rdvs/${id}`,reqp)
}
export function voireRdvInf(reqp={}){
    const id=idPatient();
    return api.post(`/admin/rdvsinf/${id}`,reqp)
}