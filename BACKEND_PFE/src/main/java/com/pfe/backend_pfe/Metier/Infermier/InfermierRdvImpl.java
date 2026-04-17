package com.pfe.backend_pfe.Metier.Infermier;

import com.pfe.backend_pfe.DTO.CountDto;
import com.pfe.backend_pfe.DTO.InfirmierRdvDto.DetailVccDto;
import com.pfe.backend_pfe.DTO.InfirmierRdvDto.InfermierRdvDto;
import com.pfe.backend_pfe.Entities.Dossier;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.Entities.Rendez_Vous;
import com.pfe.backend_pfe.Exceptions.RdvNontrouvableException;
import com.pfe.backend_pfe.reposetory.RendezVousRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class InfermierRdvImpl implements InfermierRdvMetier{

    private final RendezVousRepo rR;

    @Override
    public void confermerRdv(Long idRdv, Long idInf) throws RdvNontrouvableException {
        Rendez_Vous r = rR.findById(idRdv).orElseThrow(()-> new RdvNontrouvableException("rdv est Introvable!!"));

        if(r.getInfermier() == null || !r.getInfermier().getId().equals(idInf))
        {
            throw new RuntimeException("access refuse");
        }
        r.setStaus(Staus.Confirmer);
        rR.save(r);
    }

    @Override
    public void annullerRdv(Long idRdv, Long idInf) throws RdvNontrouvableException {
        Rendez_Vous r = rR.findById(idRdv).orElseThrow(()->new RdvNontrouvableException("rdv est introvable!!"));
        if(r.getInfermier() == null || !r.getInfermier().getId().equals(idInf)){
            throw new RuntimeException("access refuse");
        }
        r.setStaus(Staus.anullee);
        rR.save(r);
    }

    @Override
    public DetailVccDto getRdvVcc(Long id, Long idInf) throws RdvNontrouvableException {
        Rendez_Vous r = rR.findById(id).orElseThrow(()-> new RdvNontrouvableException("rdv est introvable!!"));
        if(r.getInfermier() == null || !r.getInfermier().getId().equals(idInf)){throw new RuntimeException("acces refusee!!");}
        DetailVccDto vccDto = new DetailVccDto();
        vccDto.setRdvId(r.getId());
        vccDto.setPatientId(r.getPatient().getId());
        vccDto.setDossierId(r.getPatient().getDossier().getId_dossier());
        vccDto.setNomPatient(r.getPatient().getNom());
        vccDto.setPrenomPatient(r.getPatient().getPrenom());
        vccDto.setCinPatient(r.getPatient().getCin());
        vccDto.setDate(r.getDate_rendez_vous());
        vccDto.setPeriod(r.getDureerendezvous());
        vccDto.setNumeroPatient(r.getNumrdv());
        vccDto.setDescription(r.getDescription());
        vccDto.setStatus(r.getStaus());
        vccDto.setAge(r.getPatient().getAge());
        vccDto.setSexe(r.getPatient().getSexe());
        Dossier d = r.getPatient().getDossier();

        if(d != null){
            vccDto.setGroupeSanguin(d.getG_sanguin());
            vccDto.setAllergies(d.getAllergies_notees());
            vccDto.setTraitements(d.getTraitements_actuels());
        }
        return vccDto;
    }

//    @Override
//    public List<InfermierRdvDto> getInfermierRdvs(Long idInf) {
//        List<Rendez_Vous> rdv = rR.findByInfermier_Id(idInf);
//        return rdv.stream().map(rv -> {
//            InfermierRdvDto dto = new InfermierRdvDto();
//            dto.setId(rv.getId());
//            dto.setNomPatient(rv.getPatient().getNom());
//            dto.setPrenomPatient(rv.getPatient().getPrenom());
//            dto.setCinPatient(rv.getPatient().getCin());
//            dto.setDate(rv.getDate_rendez_vous());
//            dto.setPeriode(rv.getDureerendezvous());
//            dto.setNumero(rv.getNumrdv());
//            dto.setDescription(rv.getDescription());
//            dto.setStatus(rv.getStaus());
//            return dto;
//        }).toList();
//    }

    @Override
    public List<InfermierRdvDto> getInfermierRdvs(Long idInf) {
        String duree = "";
        LocalTime now = LocalTime.now();
//        LocalTime now = LocalTime.of(15,0);//3la test
        LocalTime debutMatin = LocalTime.of(8, 0);
        LocalTime finMatin = LocalTime.of(12, 0);
        LocalTime debutApresMidi = LocalTime.of(14, 0);
        LocalTime finApresMidi = LocalTime.of(23, 0);
        if (!now.isBefore(debutMatin) && now.isBefore(finMatin)) {
            duree = "matin";
        } else if (!now.isBefore(debutApresMidi) && now.isBefore(finApresMidi)) {
            duree = "apres_midi";
        }
        //--
//        else {
//            duree = "apres_midi";
//        }//--

        Calendar cal = Calendar.getInstance();
//        cal.set(2026, Calendar.MARCH, 13);//3la test
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date dateSansHeure = cal.getTime();
        List<Rendez_Vous> rdvs = rR.findByInfermierIdAndDate_rendez_vousAndDureerendezvous(
                idInf, dateSansHeure, duree
        );
        System.out.println("inf id : " + idInf);
        System.out.println("date : " + dateSansHeure);
        System.out.println("peri : " + duree);
        return rdvs.stream().map(rv -> {
            InfermierRdvDto dto = new InfermierRdvDto();
            dto.setId(rv.getId());
            dto.setNomPatient(rv.getPatient().getNom());
            dto.setPrenomPatient(rv.getPatient().getPrenom());
            dto.setCinPatient(rv.getPatient().getCin());
            dto.setDate(rv.getDate_rendez_vous());
            dto.setPeriode(rv.getDureerendezvous());
            dto.setNumero(rv.getNumrdv());
            dto.setDescription(rv.getDescription());
            dto.setStatus(rv.getStaus());
            return dto;
        }).toList();
    }


//    @Override
//    public CountDto getStatsInfermier(Long idInf) {
//        CountDto dto = new CountDto();
//        dto.setCountRdvTotal(rR.countByInfermier_Id(idInf));
//        dto.setCountRdvenAttend(rR.countByInfermier_IdAndStaus(idInf, Staus.Valide));
//        dto.setCountRdvterminer(rR.countByInfermier_IdAndStaus(idInf, Staus.Terminer));
//        return dto;
//    }


    @Override
    public CountDto getStatsInfermier(Long idInf) {

        String duree = "";
        LocalTime now = LocalTime.now();
//        LocalTime now = LocalTime.of(15,0);
        LocalTime debutMatin = LocalTime.of(8, 0);
        LocalTime finMatin = LocalTime.of(12, 0);
        LocalTime debutApresMidi = LocalTime.of(14, 0);
        LocalTime finApresMidi = LocalTime.of(23, 0);
        if (!now.isBefore(debutMatin) && now.isBefore(finMatin)) {
            duree = "matin";
        } else if (!now.isBefore(debutApresMidi) && now.isBefore(finApresMidi)) {
            duree = "apres_midi";
        }
        //---
//        else {
//            duree = "apres_midi";
//        }
        //--
        Calendar cal = Calendar.getInstance();
//        cal.set(2026, Calendar.MARCH, 13);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date dateSansHeure = cal.getTime();
        CountDto dto = new CountDto();
        dto.setCountRdvTotal(rR.countByInfermierIdSansStatus(idInf, dateSansHeure, duree));
        dto.setCountRdvenAttend(rR.countByInfermierIdAndStatus(idInf, dateSansHeure, duree, Staus.Valide));
        dto.setCountRdvterminer(rR.countByInfermierIdAndStatus(idInf, dateSansHeure, duree, Staus.Terminer));
        return dto;
    }
}
