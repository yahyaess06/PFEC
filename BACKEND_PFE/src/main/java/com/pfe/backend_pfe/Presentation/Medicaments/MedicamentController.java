package com.pfe.backend_pfe.Presentation.Medicaments;


import com.pfe.backend_pfe.DTO.MedicamentDto;
import com.pfe.backend_pfe.DTO.VoireMedicamentDto;
import com.pfe.backend_pfe.Exceptions.MedicamentsIntrouvableException;
import com.pfe.backend_pfe.Metier.Medicament.IMedicamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class MedicamentController {
    @Autowired
    private IMedicamentService service;

    @GetMapping("/Medicaments")
    @PreAuthorize("hasRole('MEDECIN')")
    public VoireMedicamentDto voireMedList(
            @RequestParam(name="nom",defaultValue="") String nom,
            @RequestParam(name="page",defaultValue="0") int page,
            @RequestParam(name="size",defaultValue="5") int size
    ) throws MedicamentsIntrouvableException {
      return service.voireTousMedicaments(nom,page,size);
    }
}
