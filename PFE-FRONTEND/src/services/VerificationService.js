import {idPatient} from "./authService.js";
import api from "./api.js";

export function isVerified(){
    const id=idPatient();
    return api.get(`/auth/isVerified/${id}`)
}
export function valideagain(){
    const id=idPatient();
    return api.post(`/auth/reverifier/${id}`
    )
}