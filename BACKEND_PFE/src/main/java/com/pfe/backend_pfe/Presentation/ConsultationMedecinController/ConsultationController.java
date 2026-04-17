package com.pfe.backend_pfe.Presentation.ConsultationMedecinController;

import com.pfe.backend_pfe.DTO.ConsultaionDoctoor.DossierPatMed;
import com.pfe.backend_pfe.Metier.MedecinService.ConsultationMetier;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/medecin/dossier")
public class ConsultationController {

    private final ConsultationMetier metier;

    @PreAuthorize("hasRole('MEDECIN')")
    @GetMapping("/{patId}")
    public DossierPatMed getDossierPM(@PathVariable Long patId) {
        return metier.getByPatient(patId);
    }

    @PreAuthorize("hasRole('MEDECIN')")
    @PutMapping("/{patId}")
    public DossierPatMed getDossierPM(@PathVariable Long patId, @RequestBody DossierPatMed dMP) {
        return metier.updatePatientDossier(patId, dMP);
    }

}
