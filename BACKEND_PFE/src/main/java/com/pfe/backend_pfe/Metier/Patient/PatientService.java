package com.pfe.backend_pfe.Metier.Patient;

import com.pfe.backend_pfe.DTO.*;
import com.pfe.backend_pfe.Entities.Patient;
import com.pfe.backend_pfe.Exceptions.PatientNotfoundException;
import com.pfe.backend_pfe.Mappers.PatientMappers;
import com.pfe.backend_pfe.reposetory.PatientRepo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PatientService implements IPatientService{
    PatientMappers pm;
    PatientRepo pr;

    @Override
    public PatientDto voirePatient(Long idpatient) throws PatientNotfoundException {
        Patient p=pr.findById(idpatient).orElseThrow(()->
         new PatientNotfoundException("erreur !,patient non present"));
        return pm.patienttodto(p);
    }

    @Override
    public void modifie(PatientDto patientDto) throws PatientNotfoundException {
   Patient p=pm.dtotoPatient(patientDto);

   pr.save(p);
    }

    @Override
    public PagePatientDto voireEnsemblePatient(String nom,String cin, int page, int size) throws PatientNotfoundException {
        Page<FullNamePatientDto> ps=pr.findAllPatientByName(nom,cin, PageRequest.of(page, size));
        if (ps==null) throw new PatientNotfoundException("ya pas de patient");
        PagePatientDto dto=new PagePatientDto();
        dto.setPatients(ps.getContent());
        dto.setTotalPages(ps.getTotalPages());
        dto.setCurrentPage(page);
        dto.setPageSize(size);
        return dto;
    }
}
