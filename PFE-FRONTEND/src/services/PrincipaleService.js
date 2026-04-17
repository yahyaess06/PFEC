import api from "./api.js";

export function voireHopitalByRegion(){
    return api.get(`/Regions`)
}