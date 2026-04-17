package com.pfe.backend_pfe.reposetory;

import com.pfe.backend_pfe.DTO.Administrateur.AdministrateurDTO;
import com.pfe.backend_pfe.Entities.Personnel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PersonnelRepo extends JpaRepository<Personnel, Long> {
    Personnel findByEmail(String email);


    @Query("""
        select new com.pfe.backend_pfe.DTO.Administrateur.AdministrateurDTO(
            p.id, p.cin, p.nom, p.prenom, p.email, p.telephone, p.age,p.password,p.date_arrivee
        )
        from Personnel p
        where (p.role = 'ADMIN' OR p.role = 'DIRECTOR')
          and p.hopital.id_hopital = :hopitalId
          and (
              (:nom is null or :nom = '' or p.nom like concat('%', :nom, '%'))
          and
              (:cin is null or :cin = '' or p.cin like concat('%', :cin, '%'))
          )
    """)
    Page<AdministrateurDTO> findAdminsByHopitalAndNomOrCin(Long hopitalId, String nom, String cin, Pageable pageable);

    @Query("""
        select count(p)
        from Personnel p
        where p.role = 'ADMIN' or p.role = 'DIRECTOR'
          and p.hopital.id_hopital = :hopitalId
    """)
    long countAdminsByHopital(Long hopitalId);
}
