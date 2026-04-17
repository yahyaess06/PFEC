package com.pfe.backend_pfe.Presentation.Infermiers;

import com.pfe.backend_pfe.DTO.CountInf;
import com.pfe.backend_pfe.DTO.CreationInfDto;
import com.pfe.backend_pfe.DTO.PageInfermierDto;
import com.pfe.backend_pfe.Exceptions.DateApresException;
import com.pfe.backend_pfe.Exceptions.InfermierNotFoundException;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;
import com.pfe.backend_pfe.Metier.Infermiers.IInfermierService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/infermiers")
@RequiredArgsConstructor
@CrossOrigin("*")
public class InfermierControllers {

    private final IInfermierService iS;

    @GetMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public CountInf getInfermierPourAdmin(@PathVariable Long id)
            throws PersonnelNotFOundException {
        return iS.voireNombreDocs(id);
    }

    @GetMapping("/admin/infermiers/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public PageInfermierDto voireInfermiers(
            @PathVariable Long id,
            @RequestParam(name = "nom", defaultValue = "") String nom,
            @RequestParam(name = "cin", defaultValue = "") String cin,
            @RequestParam(name = "spec", defaultValue = "") String spec,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size)
            throws PersonnelNotFOundException, InfermierNotFoundException {

        return iS.voireMedcines(id, nom, cin, spec, page, size);
    }

    @PostMapping("/admin/creerinfermiers/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public void creerInfermier(@PathVariable Long id,
                               @RequestBody CreationInfDto c)
            throws PersonnelNotFOundException, DateApresException {
        iS.creerOuModifierInf(c, id);
    }

    @DeleteMapping("/admin/supprimerInfermier/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public void supprimer(@PathVariable Long id)
            throws PersonnelNotFOundException {
        iS.supprimerDepuisHopital(id);
    }

    @GetMapping("/admin/voirInfermier/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public CreationInfDto voir(@PathVariable Long id)
            throws PersonnelNotFOundException {
        return iS.voireMed(id);
    }

    @GetMapping("/admin/listSpecInfermier")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public List<String> voireSpecsInf(){
        return iS.listSpecInfermier();
    }
}