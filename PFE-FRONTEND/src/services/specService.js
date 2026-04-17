
import api from "./api";

export function getAllSpecialities() {
    return api.get("/allSpecs");
}