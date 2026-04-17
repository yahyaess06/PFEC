package com.pfe.backend_pfe.reposetory;

import com.pfe.backend_pfe.DTO.AdministrateurRdvs.DepartementNomsDto;
import com.pfe.backend_pfe.DTO.DepartementsDto;
import com.pfe.backend_pfe.DTO.MedecinsDto;
import com.pfe.backend_pfe.DTO.MedicamentDto;
import com.pfe.backend_pfe.Entities.Medecin;
import com.pfe.backend_pfe.Entities.Rendez_Vous;
import com.pfe.backend_pfe.Entities.Specialite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

//bdalt lgeneric v mn String to Long
public interface MedcineRepo extends JpaRepository<Medecin,Long> {

    List<Medecin> findBySpecialite(Specialite specialite);

    @Query("select count(DISTINCT m.id) from Medecin m join m.dossier d join d.patient p where p.id = :patient_id")
    Long countByDistinctMedecins(@Param("patient_id") Long patient_id);


    @Query("Select m.nom From Medecin m WHERE m.id = :id")
    String findNomById(@Param("id") Long id);

    @Query("Select m.specialite From Medecin m WHERE m.id = :id")
    String findSpecialiteById(@Param("id") Long id);

    @Query("select m.specialite.nomspec From Medecin m WHERE m.id = :id")
    String findSpecialiteByMedcinId(@Param("id") Long id);

    @Query("SELECT m FROM Medecin m JOIN FETCH m.specialite")
    List<Medecin> findAllBySpecialite();
    //----
    @Query("SELECT m FROM Medecin m where m.specialite.nomspec=:specialite and m.hopital.id_hopital=:id")
    List<Medecin> findBySpecialite(@Param("specialite") String specialite,@Param("id") Long id);
    @Query("SELECT m FROM Medecin m WHERE m.specialite.nomspec = :specialite ORDER BY m.id")
    Page<Medecin> findBySpecialiteMed(@Param("specialite") String specialite, Pageable pageable);
    //====
    @Query("SELECT new com.pfe.backend_pfe.DTO.DepartementsDto(m.specialite.nomspec,count(m)) FROM Medecin m where m.hopital.id_hopital=:id  GROUP BY m.specialite.nomspec")
    Page<DepartementsDto> findBySpecialitecount( @Param("id") Long id, Pageable pageable);

    @Query("SELECT new com.pfe.backend_pfe.DTO.AdministrateurRdvs.DepartementNomsDto(m.specialite.nomspec) From Medecin m" +
            " where m.hopital.id_hopital=:id  GROUP BY m.specialite.nomspec")
    List<DepartementNomsDto> FindDepartementNameByHopitalId(@Param("id") Long id);


    @Query("Select count(m) from Medecin m where m.hopital.id_hopital=:id")
    Long FindCountMedecin(@Param("id") Long id);

    //@Query("SELECT m FROM Medecin m WHERE LOWER(m.specialite.nomspec) LIKE '%gyn%'")
    //List<Medecin> findGynecologues();

    @Query("select new com.pfe.backend_pfe.DTO.MedecinsDto(m.id,m.nom,m.prenom,m.specialite.nomspec,m.email,m.telephone,m.cin) from Medecin m " +
            "where m.hopital.id_hopital=:hopitalid and (:nom = '' or m.nom like concat('%', :nom, '%')) and  (:spec is null or :spec='' or m.specialite.nomspec=:spec) and (:cin  = '' or m.cin like concat('%', :cin, '%'))")
Page<MedecinsDto> findAllBySpecialiteOrNom(@Param("hopitalid") Long hopitalid,@Param("nom") String nom,@Param("spec") String spec,@Param("cin") String cin ,Pageable pageable);

    @Query("SELECT m FROM Medecin m JOIN m.specialite s JOIN m.hopital h  WHERE LOWER(s.nomspec) = 'gynécologie' AND h.id_hopital = :hopitalId")
    List<Medecin> findGynecologuesByHopital(@Param("hopitalId") Long hopitalId);

    //Optional<Medecin> findByEmail(String email); //kansta3mlo Optinal bach ila kan medecin f db 0 mantihoch f nullPointerExeception
    @Query("select m from Medecin m where m.hopital.id_hopital=:id")
    Medecin findByHopitalID(@Param("id") Long id);

    @Query("select m from Medecin m where m.hopital.id_hopital=:id")
    List<Medecin> findByMHopitalID(@Param("id") Long id);


    Medecin findByEmail(String email);

    //List<Medecin> findBySpec(String spec);

    @Query("select r from Rendez_Vous r where r.medecin.id = :id and r.date_rendez_vous = :date order by r.priority desc, r.numrdv asc")
    List<Rendez_Vous> findByMedecinAndDateOrdered(@Param("id") Long id, @Param("date") Date date);

    @Query("select count(m) from Medecin m where m.hopital.id_hopital=:id")
    int findCountByHopitalID(@Param("id") Long id);

    boolean existsByEmail(String email);
    @Query("select m from Medecin m where m.hopital.id_hopital=:id and m.specialite.nomspec=:specialite")
    List<Medecin> findByHopitalIdAndSpecialite(@Param("id") Long id,@Param("specialite") String specialite);
}
