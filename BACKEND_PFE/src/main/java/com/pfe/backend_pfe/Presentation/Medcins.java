package com.pfe.backend_pfe.Presentation;

import com.pfe.backend_pfe.DTO.MedecinProfileDto;
import com.pfe.backend_pfe.Exceptions.MedcinNotFoundException;
import com.pfe.backend_pfe.Metier.Medecin.MedecinService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/medecin/profile")
public class Medcins {

    private final MedecinService mS;

    @PreAuthorize("hasRole('MEDECIN')")
    @GetMapping()
    public MedecinProfileDto getMedecin(Authentication auth) throws MedcinNotFoundException {
        Long idMed = Long.valueOf(auth.getName());
        return mS.voireMedecin(idMed);
    }

//    @PutMapping("/medecin/modifie")
//    public void modifieMedecin(@RequestBody MedecinProfileDto MProfileDto) {
//        mS.modifie(MProfileDto);
//    }
}
