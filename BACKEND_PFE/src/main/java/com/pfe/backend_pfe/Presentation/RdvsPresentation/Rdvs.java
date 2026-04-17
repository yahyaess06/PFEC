package com.pfe.backend_pfe.Presentation.RdvsPresentation;


import com.pfe.backend_pfe.DTO.*;
import com.pfe.backend_pfe.DTO.AdministrateurRdvs.PagerDto;
import com.pfe.backend_pfe.DTO.AdministrateurRdvs.Pagerr;
import com.pfe.backend_pfe.DTO.AdministrateurRdvs.RequestParame;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.Exceptions.*;
import com.pfe.backend_pfe.Exceptions.RdvNontrouvableException;
import com.pfe.backend_pfe.Metier.Rdvs.IRdvsService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class Rdvs {
    IRdvsService rdvsService;
    @PreAuthorize("hasRole('PATIENT')")
    @GetMapping(("/Rendez_Vous/{id}"))
    public List<RdvsDto> getRendez_Vous(@PathVariable Long id) {
     return rdvsService.getRdvs(id);
    }
    @PreAuthorize("hasRole('PATIENT')")
    @GetMapping(("/Rendez_Vous/Vaccins/{id}"))
    public List<VrdvDto> getRendezVousViccins(@PathVariable Long id) {
        return rdvsService.getVaccinRdv(id);
    }
    @PostMapping("/Rendez_Vous/annulation/{id}")
    @PreAuthorize("hasAnyRole('PATIENT','MEDECIN')")
    public void annulerrdv(@PathVariable Long id) throws RdvNontrouvableException {
        rdvsService.actionAnnule(id);
    }
    @PostMapping("/Rendez_Vous/confirmation/{id}")
    @PreAuthorize("hasRole('MEDECIN')")
    public void comfirmerrdv(@PathVariable Long id) throws RdvNontrouvableException {
        rdvsService.actionConfirmer(id);
    }

    @PostMapping("/Rendezvous/prendreRdvSimple")
    @PreAuthorize("hasRole('PATIENT')")
    public void prendreRdv(@RequestBody Prenrdvdto prdv) throws PatientNotfoundException, HoptialNotfoundException, MedcinNotFoundException, DossierNotFoundException, HopitalFullException, DateDejaPasseException, RdvDupliquerException {
        rdvsService.prendreRdv(prdv);
    }
    @GetMapping("/Rendezvous/rdv/{id}")
    @PreAuthorize("hasAnyRole('PATIENT')")
    public VoireRdvDto voireRdvDto(@PathVariable Long id) throws RdvNontrouvableException {
        return rdvsService.voireRdv(id);
    }
    @PostMapping("/Rendezvous/prendreRdv/Vaccin")
    @PreAuthorize("hasRole('PATIENT')")
    public void prendreRdvVaccin(@RequestBody VaccinRdvDto prdv) throws PatientNotfoundException, HoptialNotfoundException, MedcinNotFoundException, DossierNotFoundException, HopitalFullException, InfermierIntrouvableException, DateDejaPasseException, RdvDupliquerException {
        rdvsService.vacinRdv(prdv);
    }
    @GetMapping("/Rendezvous/rdvvaccin/{id}")
    @PreAuthorize("hasRole('PATIENT')")
    public VoirdetailsVaccinDto voireRdvVaccinDto(@PathVariable Long id) throws RdvNontrouvableException {
        return rdvsService.voirdetailsVaccinDto(id);
    }
    @GetMapping("/Rendezvousbymedcin/{id}")
    @PreAuthorize("hasRole('MEDECIN')")
    public List<RdvsMedcinDto> voireRdvsparMedcin(@PathVariable Long id) {
        return rdvsService.voireRdvsMedcin(id);
    }
    @GetMapping("/Rendezvouscount/{id}")
    @PreAuthorize("hasRole('MEDECIN')")
    public CountDto voireRdvTotal(@PathVariable Long id){
        return rdvsService.voireRdvTotal(id);
    }

    @PostMapping("/admin/rdvs/{id}")
    @PreAuthorize("hasAnyRole('DIRECTOR','ADMIN')")
    public PagerDto voireRdvsAdmin(@PathVariable Long id,
                                   @RequestBody RequestParame rp
           ) throws RdvsJourException, PersonnelNotFOundException {
        int size=5;
        return rdvsService.voireRdvsParjour(id,rp.getDate(),rp.getDepartement(),rp.getS(),rp.getPage(),size);
        }
    @PostMapping("/admin/rdvsinf/{id}")
    @PreAuthorize("hasAnyRole('DIRECTOR','ADMIN')")
    public Pagerr voireRdvsAdminInf(@PathVariable Long id,
                                    @RequestBody RequestParame rp
    ) throws RdvsJourException, PersonnelNotFOundException {
        int size=5;
        return rdvsService.voireRdvsParjourInf(id,rp.getDate(),rp.getPage(),size,rp.getS());
    }

    @GetMapping("/patient/notification/{id}")
    @PreAuthorize("hasRole('PATIENT')")
    public NombreDto getNumber(@PathVariable Long id) throws RdvsJourException {
        return rdvsService.voireNbDtoNotification(id);
    }

}
