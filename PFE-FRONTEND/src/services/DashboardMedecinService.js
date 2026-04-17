import api from "./api"

export function getDashboardMed(){
    return api.get("/medecin/dashboard");
}