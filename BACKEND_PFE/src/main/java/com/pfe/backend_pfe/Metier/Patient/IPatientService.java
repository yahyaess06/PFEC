package com.pfe.backend_pfe.Metier.Patient;

import com.pfe.backend_pfe.DTO.PagePatientDto;
import com.pfe.backend_pfe.DTO.PatientDto;
import com.pfe.backend_pfe.Entities.Patient;
import com.pfe.backend_pfe.Exceptions.PatientNotfoundException;

import java.util.List;

public interface IPatientService {
    PatientDto voirePatient(Long idpatient)throws PatientNotfoundException;
    void modifie(PatientDto patientDto)throws PatientNotfoundException;

    PagePatientDto voireEnsemblePatient(String nom,String cin, int page, int size) throws PatientNotfoundException;
}
