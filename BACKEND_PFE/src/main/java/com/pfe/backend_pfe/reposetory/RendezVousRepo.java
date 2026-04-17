package com.pfe.backend_pfe.reposetory;


import com.pfe.backend_pfe.DTO.AdministrateurRdvs.RdvsAdDto;
import com.pfe.backend_pfe.DTO.AdministrateurRdvs.RdvsAdminDto;
import com.pfe.backend_pfe.DTO.MedecinsDto;
import com.pfe.backend_pfe.DTO.MedicamentDto;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;

import com.pfe.backend_pfe.Entities.Rendez_Vous;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.Date;
import java.util.List;

public interface RendezVousRepo extends JpaRepository<Rendez_Vous,Long> {
    //@Query("Select count(r) from Rendez_Vous r join r.dossieR d join d.patient p where p.id = :patient_id and r.date_rendez_vous > CURRENT_TIMESTAMP and r.staus <> com.pfe.backend_pfe.Entities.Enumerations.Staus.anullee")
//modification
    //    @Query("select count(r) from Rendez_Vous r where r.patient.id = :patient_id and r.date_rendez_vous >= CURRENT_DATE and r.staus <> com.pfe.backend_pfe.Entities.Enumerations.Staus.anullee")
//    Long countRdvAVenir(@Param("patient_id") Long patient_id);
    @Query("select count(r) from Rendez_Vous r where r.patient.id = :patient_id and r.date_rendez_vous >= CURRENT_DATE and (r.staus = com.pfe.backend_pfe.Entities.Enumerations.Staus.Valide or r.staus = com.pfe.backend_pfe.Entities.Enumerations.Staus.Confirmer)")
    Long countRdvAVenir(@Param("patient_id") Long patient_id);
//--------------------------

    //@Query("Select r from Rendez_Vous r join r.dossieR d join d.patient p where p.id = :patient_id and r.date_rendez_vous > CURRENT_TIMESTAMP order by r.date_rendez_vous ASC")
    //modification
//        @Query("select r from Rendez_Vous r where r.patient.id = :patient_id and r.staus = com.pfe.backend_pfe.Entities.Enumerations.Staus.Valide and r.date_rendez_vous >= CURRENT_DATE order by r.date_rendez_vous asc")
    @Query("select r from Rendez_Vous r where r.patient.id = :patient_id and (r.staus = com.pfe.backend_pfe.Entities.Enumerations.Staus.Valide or r.staus = com.pfe.backend_pfe.Entities.Enumerations.Staus.Confirmer) and r.date_rendez_vous >= CURRENT_DATE order by r.date_rendez_vous asc")
    List<Rendez_Vous> findNextRendezVous(@Param("patient_id") Long patient_id);
//---
    @Query("select r from Rendez_Vous r where r.patient.id = :patient_id and r.staus = com.pfe.backend_pfe.Entities.Enumerations.Staus.Valide and r.date_rendez_vous >= CURRENT_DATE order by r.date_rendez_vous asc")
    List<Rendez_Vous> findNextRendezVousnot(@Param("patient_id") Long patient_id);


    @Query("select count(r) from Rendez_Vous r where r.patient.id = :patient_id and r.staus = :status")
    Long countRendez_VousByStatus(@Param("patient_id") Long patient_id, @Param("status") Staus status);

//    @Query("select count(r) from Rendez_Vous r where  r.medecin.specialite=:specialite and r.date_rendez_vous=:date and r.dureerendezvous =:duree")
//    Long FindNumberRendezVousByDateAndDureeAndMedecinSpecialite(@Param("date") Date date, @Param("duree") String duree
//            , @Param("specialite") String specialite);

    @Query("select r.medecin.id from Rendez_Vous r where r.id=:id")
    Long FindMedcinById(@Param("id") Long id);

    @Query("select r.infermier.id from Rendez_Vous r where r.id=:id")
    Long FindInfermierById(@Param("id") Long id);

    @Query("select count(r) from Rendez_Vous r where r.medecin.id =:id and r.date_rendez_vous=:date and r.dureerendezvous =:duree and r.staus= :status")
    Long FindNumberRendezVousByMedecinId(@Param("id") Long id,@Param("date") Date date, @Param("duree") String duree ,@Param("status") Staus status);

    @Query("select count(r) from Rendez_Vous r where r.medecin.id =:id and r.date_rendez_vous=:date and r.dureerendezvous =:duree")
    Long FindNumberRendezVousByMedecinIdSansStatus(@Param("id") Long id,@Param("date") Date date, @Param("duree") String duree);


    @Query("select count(r) from Rendez_Vous r where r.infermier.id =:id and r.date_rendez_vous=:date and r.dureerendezvous =:duree and r.staus= :status")
    Long FindNumberRendezVousByInfermierId(@Param("id") Long id,@Param("date") Date date, @Param("duree") String duree ,@Param("status") Staus status);

    List<Rendez_Vous> findAllByPatient_Id(Long id);

    @Query("select r from Rendez_Vous r where r.patient.id=:id and r.infermier.id IS NOT NULL")
    List<Rendez_Vous> findAllByPatientIdAndContainsInfermierId(Long id);

    @Query("select r from Rendez_Vous r where r.patient.id=:id and r.medecin.id IS NOT NULL")
    List<Rendez_Vous> findAllByPatientIdAndContainsMedecinId(Long id);

//    @Query("select r.medecin.specialite from Rendez_Vous r where r.id_rendez_vous=:id")
//   Long FindSpecialite(@Param("id") Long id);

    @Query("select count(r) from Rendez_Vous r where r.hopital.id_hopital = :hopitalId and r.date_rendez_vous = :date and r.medecin.specialite.nomspec = 'Gynécologie' and r.staus <> com.pfe.backend_pfe.Entities.Enumerations.Staus.anullee")
    Long countGynecoRdvsByHopitalAndDate(@Param("hopitalId") Long hopitalId, @Param("date") Date date);
//modification
//    @Query("select r from Rendez_Vous r where r.medecin.id =:id and  r.date_rendez_vous=:date and r.dureerendezvous =:duree")
//    List<Rendez_Vous> findByMedecinIdAndDate_rendez_vousAndDureerendezvous(@Param("id") Long id,@Param("date") Date date, @Param("duree") String duree);
@Query("select r from Rendez_Vous r where r.medecin.id =:id and  r.date_rendez_vous=:date and (r.dureerendezvous =:duree or r.priority = true) order by r.priority desc, r.numrdv asc")
List<Rendez_Vous> findByMedecinIdAndDate_rendez_vousAndDureerendezvous(@Param("id") Long id,@Param("date") Date date, @Param("duree") String duree);
    //--------

    @Query("select r.medecin.id, count(r) from Rendez_Vous r where r.hopital.id_hopital = :hopitalId and r.date_rendez_vous = :date and r.medecin.id in :medecinIds group by r.medecin.id")
    List<Object[]> countRdvsByMedecin(@Param("hopitalId") Long hopitalId, @Param("date") Date date, @Param("medecinIds") List<Long> medecinIds);


    //Medecin

    //bach n ndiro l filter b duree makontch kandir filter bduree
    @Query("select count(r) from Rendez_Vous r where r.medecin.id = :medId and r.date_rendez_vous = :date and r.dureerendezvous = :duree")
    Long countTotalToday(@Param("medId") Long medId, @Param("date") Date date, @Param("duree") String duree);
    @Query("select count(r) from Rendez_Vous r where r.medecin.id = :medId and r.date_rendez_vous = :date and r.dureerendezvous = :duree and r.staus = :status")
    Long countTodayByStatus(@Param("medId") Long medId, @Param("date") Date date, @Param("duree") String duree, @Param("status") Staus status);
    //------
    @Query("select count(distinct r.patient.id) from Rendez_Vous r where r.medecin.id = :medecinId")
    Long countDistinctPatientsByMedecin(@Param("medecinId") Long medecinId);

    @Query("select count(r) from Rendez_Vous r where r.medecin.id = :medecinId and r.staus = com.pfe.backend_pfe.Entities.Enumerations.Staus.Terminer")
    Long countTerminerByMedecin(@Param("medecinId") Long medecinId);

    //@Query("select count(r) from Rendez_Vous r where r.medecin.id = :medecinId and r.staus = com.pfe.backend_pfe.Entities.Enumerations.Staus.Valide and r.date_rendez_vous >= CURRENT_TIMESTAMP")
    //Long countValideByMedecin(@Param("medecinId") Long medecinId);
    @Query("select count(r) from Rendez_Vous r where r.medecin.id =:medecinId and r.staus = com.pfe.backend_pfe.Entities.Enumerations.Staus.Confirmer")
    Long countConfermeeByMedecin(@Param("medecinId") Long medecinId);

    @Query("select count(r) from Rendez_Vous r where r.medecin.id = :medecinId and r.staus = com.pfe.backend_pfe.Entities.Enumerations.Staus.anullee")
    Long countAnnulesByMedecin(@Param("medecinId") Long medecinId);

    @Query("select count(r) from Rendez_Vous r where r.medecin.id = :medecinId and r.staus = com.pfe.backend_pfe.Entities.Enumerations.Staus.Valide")
    Long countEnAttenteByMedecin(@Param("medecinId") Long medecinId);

    @Query("select count(r) from Rendez_Vous r where r.medecin.id = :id and r.date_rendez_vous = :date and r.priority = true")
    Long countUrgentByMedecinAndDate(@Param("id") Long id, @Param("date") Date date);//urgent counting
    //Infermier
    List<Rendez_Vous> findByInfermier_Id(Long id);

    @Query("SELECT r FROM Rendez_Vous r WHERE r.infermier.id = :id")
    List<Rendez_Vous> findVaccinationByInfermier(@Param("id") Long id);


    Long countByInfermier_Id(Long infermierId);
    Long countByInfermier_IdAndStaus(Long id, Staus staus);

    //--la meme methode ghir zadt order by
//    @Query("select r from Rendez_Vous r where r.infermier.id =:id and r.date_rendez_vous=:date and r.dureerendezvous =:duree")
//    List<Rendez_Vous> findByInfermierIdAndDate_rendez_vousAndDureerendezvous(@Param("id") Long id, @Param("date") Date date, @Param("duree") String duree);
        @Query("select r from Rendez_Vous r where r.infermier.id =:id and r.date_rendez_vous=:date and r.dureerendezvous =:duree order by r.numrdv asc")
    List<Rendez_Vous> findByInfermierIdAndDate_rendez_vousAndDureerendezvous(@Param("id") Long id, @Param("date") Date date, @Param("duree") String duree);
//---
    @Query("select count(r) from Rendez_Vous r where r.infermier.id =:id and r.date_rendez_vous=:date and r.dureerendezvous =:duree")
    Long countByInfermierIdSansStatus(@Param("id") Long id, @Param("date") Date date, @Param("duree") String duree);

    @Query("select count(r) from Rendez_Vous r where r.infermier.id =:id and r.date_rendez_vous=:date and r.dureerendezvous =:duree and r.staus = :status")
    Long countByInfermierIdAndStatus(@Param("id") Long id, @Param("date") Date date, @Param("duree") String duree, @Param("status") Staus status);
//@Query("select new com.pfe.backend_pfe.DTO.AdministrateurRdvs.RdvsAdminDto(r.date_rendez_vous,r.dureerendezvous" +
//        ",r.patient.nom,r.patient.prenom,r.patient.age,r.medecin.nom,r.medecin.prenom,r.medecin.specialite.nomspec,r.numrdv,r.description," +
//        "r.staus) from Rendez_Vous r where " +
//        "r.hopital.id_hopital=:idhopital and (r.date_rendez_vous=:daterdv or :daterdv is null)" +
//        "and (:d = '' or :d is null or r.medecin.specialite.nomspec=:d) and (:s is null or r.staus=:s)")
//    Page<RdvsAdminDto> findRendezVousByParams(@Param("idhopital") Long idhopital,@Param("daterdv") Date daterdv,@Param("d") String d,@Param("s") Staus s, Pageable pageable);

    @Query("""
select new com.pfe.backend_pfe.DTO.AdministrateurRdvs.RdvsAdminDto(
    r.date_rendez_vous,
    r.dureerendezvous,
    r.patient.nom,
    r.patient.prenom,
    r.patient.age,
    r.medecin.nom,
    r.medecin.prenom,
    r.medecin.specialite.nomspec,
    r.numrdv,
    r.description,
    r.staus
)
from Rendez_Vous r
where r.hopital.id_hopital = :idhopital
and ( cast(:daterdv as date ) is null or r.date_rendez_vous = :daterdv)
and ( :d='' or r.medecin.specialite.nomspec = :d)
and (:s is null or r.staus = :s)
""")
    Page<RdvsAdminDto> findRendezVousByParams(
            @Param("idhopital") Long idhopital,
            @Param("daterdv") Date daterdv,
            @Param("d") String d,
            @Param("s") Staus s,
            Pageable pageable
    );

    @Query("""
select new com.pfe.backend_pfe.DTO.AdministrateurRdvs.RdvsAdDto(
    r.date_rendez_vous,
    r.dureerendezvous,
    r.patient.nom,
    r.patient.prenom,
    r.patient.age,
    r.infermier.nom,
    r.infermier.prenom,
    r.numrdv,
    r.description,
    r.staus
)
from Rendez_Vous r
where r.hopital.id_hopital = :idhopital
  and r.infermier is not null
  and (cast(:daterdv as date) is null or r.date_rendez_vous = :daterdv)
  and (:s is null or r.staus = :s)
""")
    Page<RdvsAdDto> findRdvsInfermier(
            @Param("idhopital") Long idhopital,
            @Param("daterdv") Date daterdv,
            @Param("s") Staus s,
            Pageable pageable
    );


@Query("select count(distinct r.patient) from Rendez_Vous r where r.hopital.id_hopital=:id and r.date_rendez_vous between :lwala and :tania")
    int FindCountPatient(@Param("id") Long id,@Param("lwala") Date lwala,@Param("tania") Date tania);

    @Query("select count(r) from Rendez_Vous r where r.hopital.id_hopital=:id and r.staus=:status and r.date_rendez_vous between :lwala and :tania")
    int FindCountRdvsparmois(@Param("id") Long id,@Param("lwala") Date lwala,@Param("tania") Date tania,@Param("status") Staus status);
    @Query("select count(r) from Rendez_Vous r where r.staus=:s and r.date_rendez_vous=:date")
    int findRdvattentCount(@Param("s") Staus s,@Param("date") Date date);

    @Query("select count(r) from Rendez_Vous r where r.date_rendez_vous=:date")
    int findRdvcountbydate(@Param("date") Date date);
    //dashboard infermier
    @Query("select count(r) from Rendez_Vous r where r.infermier.id = :infId and r.staus = :status")
    Long countByInfermierAndStatus(Long infId, Staus status);

    @Query("select count(r) from Rendez_Vous r where r.medecin.specialite.nomspec=:spec and r.staus=:s and r.date_rendez_vous=:date")
    int findRdvsBySpec(@Param("spec") String spec,@Param("s") Staus s,@Param("date") Date date);

//    @Query("select count(r) from Rendez_Vous r where r.staus=:status and r.date_rendez_vous between :lwala and :tania")
//    int findRdvByst
//
    @Query("select count(r) from Rendez_Vous r where r.infermier.id = :infId")
    Long countTotalByInfermier(Long infId);

    @Query("select count(DISTINCT r.patient.id) from Rendez_Vous r where r.infermier.id = :infId")
    Long countDistinctPatientsByInfermier(Long infId);


    //zyadat f maintenance
    @Query("select count(r) from Rendez_Vous r where r.patient.id = :patientId and r.date_rendez_vous = :date and r.staus <> com.pfe.backend_pfe.Entities.Enumerations.Staus.anullee")
    Long countByPatientAndDate(@Param("patientId") Long patientId, @Param("date") Date date);

    @Query("""
SELECT COUNT(r)
FROM Rendez_Vous r
WHERE r.patient.id = :patientId
AND r.date_rendez_vous = :date
AND r.medecin.specialite.nomspec = :nomspec
""")
    int existsRendezVousAfterDateAndSpecialite(
            @Param("patientId") Long patientId,
            @Param("date") Date date,
            @Param("nomspec") String nomspec
    );
    @Query("""
SELECT COUNT(r)
FROM Rendez_Vous r
WHERE r.patient.id = :patientId
AND r.date_rendez_vous = :date
AND r.infermier.specialite = :nomspec
""")
    int existsRendezVousInfAfterDateAndSpecialite(
            @Param("patientId") Long patientId,
            @Param("date") Date date,
            @Param("nomspec") String nomspec
    );
}

