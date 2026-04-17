package com.pfe.backend_pfe.Mappers;


import com.pfe.backend_pfe.DTO.PatientDto;
import com.pfe.backend_pfe.Entities.Patient;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class PatientMappers {
    public PatientDto patienttodto(Patient p){
        PatientDto pdto = new PatientDto();
        BeanUtils.copyProperties(p,pdto);
        return pdto;
    }
    public Patient dtotoPatient(PatientDto p){
       Patient patient = new Patient();
       BeanUtils.copyProperties(p,patient);
       return patient;
    }
}
