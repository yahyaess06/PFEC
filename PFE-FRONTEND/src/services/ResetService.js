import api from "./api";

export function envoyerMail(email) {
    return api.post(`/auth/token/${email}`);
}
export function resetPass(passes){
    return api.post("auth/token",passes);
}