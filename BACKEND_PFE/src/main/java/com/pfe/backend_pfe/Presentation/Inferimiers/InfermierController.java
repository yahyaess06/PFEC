package com.pfe.backend_pfe.Presentation.Inferimiers;

import com.pfe.backend_pfe.DTO.CountDto;
import com.pfe.backend_pfe.DTO.InfirmierRdvDto.*;
import com.pfe.backend_pfe.Entities.Vaccination;
import com.pfe.backend_pfe.Exceptions.DossierNotFoundException;
import com.pfe.backend_pfe.Exceptions.InfermierIntrouvableException;
import com.pfe.backend_pfe.Exceptions.RdvNontrouvableException;
import com.pfe.backend_pfe.Metier.Infermier.ConsVccMetier;
import com.pfe.backend_pfe.Metier.Infermier.Dash_InfMetier;
import com.pfe.backend_pfe.Metier.Infermier.InfermierRdvMetier;
import com.pfe.backend_pfe.Metier.Infermier.ProfileInfMetier;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/infermier")
public class InfermierController {
    private final InfermierRdvMetier metier;
    private final ConsVccMetier cmetier;
    private final Dash_InfMetier dmetier;
    private final ProfileInfMetier pmetier;

    @PreAuthorize("hasRole('INFERMIER')")
    @GetMapping("/rdvs_infermier")
    public List<InfermierRdvDto> getRdvsInfermier(Authentication auth) {
        Long id = Long.valueOf(auth.getName());// kanjibo l id mn token
        //System.out.println("authht  name : "+auth.getName());
        return metier.getInfermierRdvs(id);
    }

    @PreAuthorize("hasRole('INFERMIER')")
    @GetMapping("/statistiques")
    public CountDto statsInfermier(Authentication auth){
        Long id = Long.valueOf(auth.getName());
        return metier.getStatsInfermier(id);
    }

    @PreAuthorize("hasRole('INFERMIER')")
    @PutMapping("/confirmer/{id}")
    public void confirmer(@PathVariable Long id, Authentication auth) throws RdvNontrouvableException {
        Long idInf = Long.valueOf(auth.getName());
        metier.confermerRdv(id, idInf);
    }

    @PreAuthorize("hasRole('INFERMIER')")
    @PutMapping("/annuler/{id}")
    public void annuler(@PathVariable Long id, Authentication auth) throws RdvNontrouvableException {
        Long idInf = Long.valueOf(auth.getName());
        metier.annullerRdv(id, idInf);
    }

    @GetMapping("/rdv/{id}")
    @PreAuthorize("hasRole('INFERMIER')")
    public DetailVccDto getRdvDetail(@PathVariable Long id, Authentication auth) throws RdvNontrouvableException {
        Long idInf = Long.valueOf(auth.getName());
        return metier.getRdvVcc(id, idInf);
    }

    @PreAuthorize("hasRole('INFERMIER')")
    @PostMapping("/vaccination")
    public Vaccination createVaccination(@RequestBody VaccinationConsDto dto, Authentication authentication) throws DossierNotFoundException {
        Long infermierId = Long.valueOf(authentication.getName());
        return cmetier.createVcc(dto, infermierId);
    }

    @PreAuthorize("hasRole('INFERMIER')")
    @GetMapping("/dashboardInf")
    public DashboardInfDto getDashInf(Authentication auth){
        Long infId= Long.valueOf(auth.getName());
        return dmetier.getDashInfermier(infId);
    }

    @PreAuthorize("hasRole('INFERMIER')")
    @GetMapping("/profile")
    public ProfileInfDto getProfileInf(Authentication auth) throws InfermierIntrouvableException {
        Long infId= Long.valueOf(auth.getName());
        return pmetier.getProfileInfDto(infId);
    }

}
