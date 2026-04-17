package com.pfe.backend_pfe.Presentation.Departement;


import com.pfe.backend_pfe.DTO.AdministrateurRdvs.DepartementNomsDto;
import com.pfe.backend_pfe.DTO.DepartementsDto;
import com.pfe.backend_pfe.DTO.ListDepartementDto;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;
import com.pfe.backend_pfe.Exceptions.SpecialiteNotPresentInDbException;
import com.pfe.backend_pfe.Metier.Departement.DepartementService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class DepartementController {
    private final DepartementService departementService;

    @GetMapping("/Departements/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public ListDepartementDto voireData(@PathVariable Long id,
                                        @RequestParam(name="page",defaultValue="0") int page,
                                        @RequestParam(name="size",defaultValue="5") int size) throws  PersonnelNotFOundException {
       return departementService.voireDataDepartements(id,page,size);
    }

    @GetMapping("/Departements/noms/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public List<DepartementNomsDto> voireDeps(@PathVariable Long id) throws PersonnelNotFOundException {
        return departementService.voireDeps(id);
    }
}
