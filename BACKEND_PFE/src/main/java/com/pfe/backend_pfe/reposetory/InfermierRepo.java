package com.pfe.backend_pfe.reposetory;

import com.pfe.backend_pfe.DTO.InfermierVoirDto;
import com.pfe.backend_pfe.Entities.Infermier;
import com.pfe.backend_pfe.Entities.Medecin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface InfermierRepo extends JpaRepository<Infermier,Long> {

    @Query("SELECT i FROM Infermier i where i.specialite=:specialite and i.hopital.id_hopital=:id")
    List<Infermier> findBySpecialite(@Param("specialite") String specialite, @Param("id") Long id);

    @Query("Select i.nom From Infermier i WHERE i.id = :id")
    String findNomById(@Param("id") Long id);

    Infermier findByEmail(String email);

    @Query("select new com.pfe.backend_pfe.DTO.InfermierVoirDto(m.id, m.nom, m.prenom, m.specialite, m.email, m.telephone, m.cin) from Infermier m " +
            "where m.hopital.id_hopital=:hopitalid and (:nom = '' or m.nom like concat('%', :nom, '%')) and  (:spec is null or :spec='' or m.specialite=:spec) and (:cin  = '' or m.cin like concat('%', :cin, '%'))")
    Page<InfermierVoirDto> findAllBySpecialiteOrNom(@Param("hopitalid") Long hopitalid, @Param("nom") String nom, @Param("spec") String spec, @Param("cin") String cin , Pageable pageable);


    @Query("Select count(m) from Infermier m where m.hopital.id_hopital=:id")
    Long FindCountINfermier(@Param("id") Long id);

    @Query("select distinct i.specialite from Infermier i")
    List<String> findInfermierSpecialite();

    @Query("select count(i) from Infermier i where i.hopital.id_hopital=:idhop")
    int countInfsByHopitalID(@Param("idhop") Long idhop);

    boolean existsByEmail(String email);

    @Query("select m from Infermier m where m.hopital.id_hopital=:id and  m.specialite=:spec")
    List<Infermier> findByMHopitalIDAndSpecialite(@Param("id") Long id,@Param("spec") String spec);
}
