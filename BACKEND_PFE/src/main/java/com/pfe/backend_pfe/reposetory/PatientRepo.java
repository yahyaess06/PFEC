package com.pfe.backend_pfe.reposetory;

import com.pfe.backend_pfe.DTO.FullNamePatientDto;
import com.pfe.backend_pfe.DTO.MedicamentDto;
import com.pfe.backend_pfe.DTO.PatientDto;
import com.pfe.backend_pfe.Entities.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PatientRepo extends JpaRepository<Patient, Long> {
    //Optional<Patient> findByCin(String cin); kont flawl mday login b cin et password hta na9cho had lmas2ala
    //Optional<Patient> findByEmail(String email);
    Patient findByEmail(String email);

    boolean existsByEmail(String email);
    boolean existsByCin(String cin);

    @Query("select new com.pfe.backend_pfe.DTO.FullNamePatientDto(p.nom,p.prenom,p.id,p.cin) from Patient p " +
            "where (:name = '' or p.nom like concat('%', :name, '%'))\n" +
            "  and (:cin  = '' or p.cin like concat('%', :cin, '%'))")
    Page<FullNamePatientDto> findAllPatientByName(@Param("name") String name,@Param("cin") String cin, Pageable pageable);


    List<Patient> findBySexe(String sexe);
}

