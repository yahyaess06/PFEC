package com.pfe.backend_pfe.Presentation.ConsultationMedecinController;

import com.pfe.backend_pfe.DTO.ConsultaionDoctoor.EnregestreDossierPM;
import com.pfe.backend_pfe.Exceptions.DossierNotFoundException;
import com.pfe.backend_pfe.Exceptions.RdvNontrouvableException;
import com.pfe.backend_pfe.Metier.MedecinService.ConsuDossierMetier;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/medecin/consultaion")
public class SaveConsuDossier {

    private final ConsuDossierMetier metier;

    @PreAuthorize("hasRole('MEDECIN')")
    @PutMapping("/{rdvId}")
    public void saveConsultaionD(@PathVariable Long rdvId, @RequestBody EnregestreDossierPM eDPM) throws RdvNontrouvableException, DossierNotFoundException {
        metier.saveConsultation(rdvId, eDPM);
    }

}
