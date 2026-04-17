import api from "./api.js";


export function voireStaus(){
return api.get(`/stausadmin`)
}