package com.pfe.backend_pfe.Metier.MedecinService;

import com.pfe.backend_pfe.DTO.ConsultaionDoctoor.EnregestreDossierPM;
import com.pfe.backend_pfe.Exceptions.DossierNotFoundException;
import com.pfe.backend_pfe.Exceptions.RdvNontrouvableException;

public interface ConsuDossierMetier {
    //void saveConsultation(Long rdvId, EnregestreDossierPM saveDossierPM);
    void saveConsultation(Long ordId, EnregestreDossierPM saveDossierPM) throws RdvNontrouvableException, DossierNotFoundException;
}
