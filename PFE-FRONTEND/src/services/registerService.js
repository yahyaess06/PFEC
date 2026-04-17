import api from "./api.js";

export function register(form){
    return api.post("http://localhost:9090/auth/register",form)
}