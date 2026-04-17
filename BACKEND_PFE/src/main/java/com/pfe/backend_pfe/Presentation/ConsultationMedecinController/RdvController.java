package com.pfe.backend_pfe.Presentation.ConsultationMedecinController;

import com.pfe.backend_pfe.DTO.ConsultaionDoctoor.PatientDetailDto;
import com.pfe.backend_pfe.DTO.ConsultaionDoctoor.RdvDetailDto;
import com.pfe.backend_pfe.Entities.Patient;
import com.pfe.backend_pfe.Entities.Rendez_Vous;
import com.pfe.backend_pfe.reposetory.RendezVousRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/medecin/rdv")
public class RdvController {
    private final RendezVousRepo rR;

    @PreAuthorize("hasRole('MEDECIN')")
    @GetMapping("/{id}")
    public RdvDetailDto getById(@PathVariable Long id) {

        Rendez_Vous rdv = rR.findById(id)
                .orElseThrow(() -> new RuntimeException("Rendez-vous not found"));

        RdvDetailDto dto = new RdvDetailDto();
        dto.setId(rdv.getId());
//        dto.setDate(rdv.getDate_rendez_vous().toString());
//        dto.setMotif(rdv.getMotif_viste());
//        dto.setDiagnostic(rdv.getDiagnostic());
//        dto.setStatus(rdv.getStaus().name());

        Patient p = rdv.getPatient();

        PatientDetailDto pDto = new PatientDetailDto();
        pDto.setId(p.getId());
        pDto.setNom(p.getNom());
        pDto.setPrenom(p.getPrenom());
        pDto.setSexe(p.getSexe());
        pDto.setAge(p.getAge());

        dto.setPatient(pDto);

        return dto;
    }
}
