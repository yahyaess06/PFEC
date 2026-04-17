package com.pfe.backend_pfe.Metier.MedecinService;

import com.pfe.backend_pfe.DTO.ConsultaionDoctoor.DossierPatMed;

public interface ConsultationMetier {
    DossierPatMed getByPatient(Long patId);
    DossierPatMed updatePatientDossier(Long patId, DossierPatMed dossPM);
}
