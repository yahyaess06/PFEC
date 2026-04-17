package com.pfe.backend_pfe.Presentation.MedecinControllers;

import com.pfe.backend_pfe.DTO.CountDocDto;
import com.pfe.backend_pfe.DTO.CreationDocDto;
import com.pfe.backend_pfe.DTO.MedecinProfileDto;
import com.pfe.backend_pfe.DTO.PageMedcinDto;
import com.pfe.backend_pfe.Entities.Specialite;
import com.pfe.backend_pfe.Exceptions.DateApresException;
import com.pfe.backend_pfe.Exceptions.MedcinNotFoundException;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;
import com.pfe.backend_pfe.Metier.Medecin.MedecinService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
//@RequestMapping("/medecin/profile")
public class Medecins {

    private final MedecinService mS;

    @GetMapping("/medecin/{id}")
    public MedecinProfileDto getMedecin(@PathVariable Long id) throws MedcinNotFoundException {
        return mS.voireMedecin(id);
    }

//    @PutMapping("/medecin/modifie")
//    public void modifieMedecin(@RequestBody MedecinProfileDto MProfileDto) {
//        mS.modifie(MProfileDto);
//    }

    @GetMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public CountDocDto getMedecinpourAdmin(@PathVariable Long id) throws PersonnelNotFOundException {
       return mS.voireNombreDocs(id);
    }
    @GetMapping("/admin/medecins/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public PageMedcinDto voireMedcines(
            @PathVariable Long id,
            @RequestParam(name="nom",defaultValue="") String nom,
            @RequestParam(name="cin",defaultValue="") String cin,
            @RequestParam(name="spec",defaultValue="") String spec,
            @RequestParam(name="page",defaultValue="0") int page,
            @RequestParam(name="size",defaultValue="5") int size)
            throws PersonnelNotFOundException, MedcinNotFoundException{
        return mS.voireMedcines(id, nom, cin, spec, page, size);
    }
    @PostMapping("/admin/creermedecins/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public void CreerMedecin(@PathVariable Long id, @RequestBody CreationDocDto c) throws PersonnelNotFOundException, DateApresException {
        mS.creerOuModifierMed(c,id);
    }
    @DeleteMapping("/admin/suprimerMedecin/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public void supprimer(@PathVariable Long id) throws MedcinNotFoundException {
        mS.supprimerDepuisHopital(id);
    }
    @GetMapping("/admin/VoireMed/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public CreationDocDto voir(@PathVariable Long id)throws MedcinNotFoundException {
       return mS.voireMed(id);
    }
}
