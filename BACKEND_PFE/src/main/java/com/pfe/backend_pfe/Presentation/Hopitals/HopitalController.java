package com.pfe.backend_pfe.Presentation.Hopitals;

import com.pfe.backend_pfe.DTO.HopitalDto;
import com.pfe.backend_pfe.DTO.PrincipaleDto;
import com.pfe.backend_pfe.Entities.Enumerations.Regions;
import com.pfe.backend_pfe.Metier.ServiceHopital.IServiceHopital;
import com.pfe.backend_pfe.Metier.ServiceHopital.ServiceHopital;
import com.pfe.backend_pfe.Metier.principale.IprincipaleService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class HopitalController {

    private IServiceHopital sh;
    private IprincipaleService ph;

    @PreAuthorize("hasRole('PATIENT')")
    @GetMapping("/hopitaux/{rg}")
    public List<HopitalDto> ensembleHopital(@PathVariable Regions rg) {
       return sh.afficherHoptiaux(rg);
    }

}
