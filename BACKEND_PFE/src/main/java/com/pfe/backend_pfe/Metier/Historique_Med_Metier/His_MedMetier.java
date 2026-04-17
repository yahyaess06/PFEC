package com.pfe.backend_pfe.Metier.Historique_Med_Metier;

import com.pfe.backend_pfe.DTO.HistoriqueMedicalPatient.H_MedicalDto;
import com.pfe.backend_pfe.Exceptions.DossierNotFoundException;

public interface His_MedMetier {
    H_MedicalDto getHistoriqueMed(Long patientId);
    byte[] generatePdfs(Long p_id);
    byte[] generatePdfOrdById(Long ordId);
    byte[] genereatePdfVccId(Long vccId);
    H_MedicalDto getHistoriqueVcc(Long patientId) throws DossierNotFoundException;//zadt had method bach n recuperiw ghir les vaccination
}
