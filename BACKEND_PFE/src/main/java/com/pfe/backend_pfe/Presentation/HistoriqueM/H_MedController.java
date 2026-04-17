package com.pfe.backend_pfe.Presentation.HistoriqueM;

import com.pfe.backend_pfe.DTO.HistoriqueMedicalPatient.H_MedicalDto;
import com.pfe.backend_pfe.Exceptions.DossierNotFoundException;
import com.pfe.backend_pfe.Metier.Historique_Med_Metier.His_MedMetier;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/patient/historique-medical")
@CrossOrigin(origins = "http://localhost:5173")
public class H_MedController {

    private final His_MedMetier hisMedMetier;

    @PreAuthorize("hasRole('PATIENT')")
    @GetMapping
    public H_MedicalDto getHistorique(Authentication auth) {
        Long patientId = (Long) auth.getPrincipal();
        return hisMedMetier.getHistoriqueMed(patientId);
    }

    @PreAuthorize("hasAnyRole('MEDECIN','INFERMIER','ADMIN','DIRECTOR')")
    @GetMapping("/{id}")
    public H_MedicalDto getHistorique(@PathVariable Long id)
    {
        return hisMedMetier.getHistoriqueMed(id);
    }


    @PreAuthorize("hasRole('PATIENT')")
    @GetMapping("/telechargee")
    public ResponseEntity<byte[]> uploadHistoriquez(Authentication auth) {
        Long patientId = (Long) auth.getPrincipal();
        //return hisMedMetier.getHistoriqueMed(patientId);
        byte[] pdf = hisMedMetier.generatePdfs(patientId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=historique_medical.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @PreAuthorize("hasRole('PATIENT')")
    @GetMapping("/telechargee/{idOrd}")
    public ResponseEntity<byte[]> telechargeByidOrd(@PathVariable Long idOrd) {
        byte[] pdf = hisMedMetier.generatePdfOrdById(idOrd);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=ordonnance_" + idOrd + ".pdf").contentType(MediaType.APPLICATION_PDF).body(pdf);
    }

    @PreAuthorize("hasRole('PATIENT')")
    @GetMapping("/telechargee/vaccination/{id}")
    public ResponseEntity<byte[]> downloadVaccination(@PathVariable Long id) {
        byte[] pdf = hisMedMetier.genereatePdfVccId(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=vaccination_" + id + ".pdf").contentType(MediaType.APPLICATION_PDF).body(pdf);
    }

    @PreAuthorize("hasRole('INFERMIER')")
    @GetMapping("/vaccination/{id}")
    public H_MedicalDto getHistoriqueVaccination(@PathVariable Long id) throws DossierNotFoundException {
        return hisMedMetier.getHistoriqueVcc(id);
    }
}
