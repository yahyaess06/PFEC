package com.pfe.backend_pfe.Presentation.Dash_MedecinController;

import com.pfe.backend_pfe.DTO.Dash_MedecinDto;
import com.pfe.backend_pfe.Metier.Dashboards.Dash_Medecin_Metier;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/medecin/dashboard")
public class Dash_MedecinController {
    private final Dash_Medecin_Metier metier;
    @PreAuthorize("hasRole('MEDECIN')")
    @GetMapping
    public Dash_MedecinDto getDashboard(Authentication authentication) {
        Long medecinId = Long.parseLong(authentication.getName());
        return metier.getDash_Medecin(medecinId);
    }
}
