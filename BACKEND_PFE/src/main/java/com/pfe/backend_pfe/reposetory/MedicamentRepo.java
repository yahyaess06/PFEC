package com.pfe.backend_pfe.reposetory;

import com.pfe.backend_pfe.DTO.MedicamentDto;
import com.pfe.backend_pfe.Entities.Medicament;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MedicamentRepo extends JpaRepository<Medicament, Long> {

//zadt idMedicament F QUERY
    @Query("select new com.pfe.backend_pfe.DTO.MedicamentDto(m.idMedicament,m.nom) from Medicament m where m.nom like concat('%', :name, '%')")
Page<MedicamentDto> findAllMedicamentsByName(@Param("name") String name, Pageable pageable);
}
