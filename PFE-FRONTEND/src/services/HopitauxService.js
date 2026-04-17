import api from "./api.js";

export function voireHopital(region){
    return api.get(`/hopitaux/${region}`)
}