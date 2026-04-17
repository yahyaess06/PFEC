package com.pfe.backend_pfe.Presentation.Administrateur;

import com.pfe.backend_pfe.DTO.Administrateur.AdministrateurDTO;
import com.pfe.backend_pfe.DTO.Administrateur.PageAdministrateur;
import com.pfe.backend_pfe.DTO.CountInf;
import com.pfe.backend_pfe.Exceptions.DateApresException;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;
import com.pfe.backend_pfe.Metier.Administrateur.IAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("Direction")
@RequiredArgsConstructor
public class AdministrateurConroller {
    private final IAdminService aS;

    @GetMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public CountInf getNombreAdmins(@PathVariable Long id)
            throws PersonnelNotFOundException {
        return aS.voireNombreDocs(id);
    }

    @GetMapping("/admin/admins/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public PageAdministrateur voireAdmins(
            @PathVariable Long id,
            @RequestParam(name = "nom", defaultValue = "") String nom,
            @RequestParam(name = "cin", defaultValue = "") String cin,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size)
            throws PersonnelNotFOundException {
        return aS.voireAdmins(id, nom, cin, page, size);
    }

    @PostMapping("/admin/creeradmin/{id}")
    @PreAuthorize("hasRole('DIRECTOR')")
    public AdministrateurDTO creerAdmin(
            @PathVariable Long id,
            @RequestBody AdministrateurDTO dto)
            throws PersonnelNotFOundException, DateApresException {
        return aS.creerOuModifierAdmin(id, dto);
    }

    @DeleteMapping("/admin/supprimeradmin/{id}")
    @PreAuthorize("hasRole('DIRECTOR')")
    public void supprimer(@PathVariable Long id)
            throws PersonnelNotFOundException {
        aS.supprimerDepuisHopital(id);
    }

    @GetMapping("/admin/voiradmin/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public AdministrateurDTO voir(@PathVariable Long id)
            throws PersonnelNotFOundException {
        return aS.voireAdmin(id);
    }
}
