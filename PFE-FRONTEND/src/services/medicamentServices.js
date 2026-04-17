import api from "./api";

export function voireMedicaments(currentPage,s) {
    return api.get("/Medicaments", {
        params: { page: currentPage,nom: s}
    });
}