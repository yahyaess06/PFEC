import api from "./api";

export function voirePatientInf(page, nom, cin) {
    return api.get("/PatientsInf", {
        params: {
            page,
            size: 5,
            nom: nom || "",
            cin: cin || ""
        }
    });
}