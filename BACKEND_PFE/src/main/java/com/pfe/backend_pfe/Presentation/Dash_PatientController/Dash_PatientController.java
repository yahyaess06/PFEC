package com.pfe.backend_pfe.Presentation.Dash_PatientController;

import com.pfe.backend_pfe.DTO.Dash_PatientDto;
import com.pfe.backend_pfe.Metier.Dashboards.Dash_Patient_Metier;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/patient/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class Dash_PatientController {

    private final Dash_Patient_Metier dash_Patient_Metier;

    @PreAuthorize("hasRole('PATIENT')")
    @GetMapping
    public Dash_PatientDto getDashPatient(Authentication authentication) {
        Long patient_id = (Long) authentication.getPrincipal(); //makhsnach nsta3mlo patient id f requestParam lah9ach springSecurity deja jaybo m3ah
        return dash_Patient_Metier.getDash_Patient(patient_id);
    }

}
