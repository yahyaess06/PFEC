package com.pfe.backend_pfe.reposetory;

import com.pfe.backend_pfe.DTO.HistoriqueMedicalPatient.H_MedicalDto;
import com.pfe.backend_pfe.Entities.Dossier;
import com.pfe.backend_pfe.Entities.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DossierRepo extends JpaRepository<Dossier, Long> {

    Optional<Dossier> findByPatient_Id(Long patient_id);

    void deleteByPatientId(Long id);

}
