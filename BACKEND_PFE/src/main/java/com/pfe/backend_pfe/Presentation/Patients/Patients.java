package com.pfe.backend_pfe.Presentation.Patients;
import com.pfe.backend_pfe.DTO.PagePatientDto;
import com.pfe.backend_pfe.DTO.PatientDto;
import com.pfe.backend_pfe.DTO.VoireMedicamentDto;
import com.pfe.backend_pfe.Exceptions.MedicamentsIntrouvableException;
import com.pfe.backend_pfe.Exceptions.PatientNotfoundException;
import com.pfe.backend_pfe.Metier.Patient.IPatientService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class Patients {
        private IPatientService ps;

        @GetMapping("/patients/{id}")
        public PatientDto getPatient(@PathVariable Long id) throws PatientNotfoundException {
            return ps.voirePatient(id);
        }
        @PutMapping("/patients/modifie")
    public void modifyPatient(@RequestBody PatientDto patientDto) throws PatientNotfoundException {
 ps.modifie(patientDto);
        }

    @GetMapping("/PatientsMed")
    @PreAuthorize("hasAnyRole('MEDECIN','ADMIN','DIRECTOR')")
    public PagePatientDto voireMedList(
            @RequestParam(name="nom",defaultValue="") String nom,
            @RequestParam(name="cin",defaultValue="") String cin,
            @RequestParam(name="page",defaultValue="0") int page,
            @RequestParam(name="size",defaultValue="5") int size
    ) throws PatientNotfoundException {
        return ps.voireEnsemblePatient(nom,cin,page,size);
    }


    @GetMapping("/PatientsInf")
    @PreAuthorize("hasRole('INFERMIER')")
    public PagePatientDto voireInfList(
            @RequestParam(name="nom",defaultValue="") String nom,
            @RequestParam(name="cin",defaultValue="") String cin,
            @RequestParam(name="page",defaultValue="0") int page,
            @RequestParam(name="size",defaultValue="5") int size
    ) throws PatientNotfoundException {
        return ps.voireEnsemblePatient(nom,cin,page,size);
    }
    }

