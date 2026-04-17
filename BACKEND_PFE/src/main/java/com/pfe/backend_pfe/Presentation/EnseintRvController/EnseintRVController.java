package com.pfe.backend_pfe.Presentation.EnseintRvController;

import com.pfe.backend_pfe.DTO.RV_EnseintDto.EnseintDto;
import com.pfe.backend_pfe.Entities.Medecin;
import com.pfe.backend_pfe.Entities.Specialite;
import com.pfe.backend_pfe.Exceptions.*;
import com.pfe.backend_pfe.Metier.RvEnseint.Rv_EnseintMetier;
import com.pfe.backend_pfe.reposetory.MedcineRepo;
import com.pfe.backend_pfe.reposetory.SpecRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/patient/rdv")
@CrossOrigin(origins = "http://localhost:5173")
public class EnseintRVController {

    private final Rv_EnseintMetier rv_EnseintMetier;

    @PreAuthorize("hasRole('PATIENT')")
    @PostMapping("/enseinte")
    public void prendrRvEnseint(@RequestBody EnseintDto enseintDto) throws HospitalNotFound, PatientNotfoundException, HoptialNotfoundException, DossierNotFoundException, GynecologeNotFound {
        rv_EnseintMetier.saveRvEnseint(enseintDto);
    }
}
