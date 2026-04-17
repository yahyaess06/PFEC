package com.pfe.backend_pfe.Metier.Infermier;

import com.pfe.backend_pfe.DTO.InfirmierRdvDto.DashboardInfDto;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.reposetory.RendezVousRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.Calendar;
import java.util.Date;

@Service
@Transactional
@AllArgsConstructor
public class Dash_InfImpl implements Dash_InfMetier{

    private final RendezVousRepo rR;

    @Override
    public DashboardInfDto getDashInfermier(Long idInf) {

        String duree = "";

        LocalTime now = LocalTime.now();
//        LocalTime now = LocalTime.of(15,0); //wad test

        LocalTime debutMatin = LocalTime.of(8,0);
        LocalTime finMatin = LocalTime.of(12,0);

        LocalTime debutApres = LocalTime.of(14,0);
        LocalTime finApres = LocalTime.of(21,0); //ceci pour test
        //LocalTime finApres = LocalTime.of(18,0);
        if(!now.isBefore(debutMatin) && now.isBefore(finMatin)){
            duree = "matin";
        }
        else if(!now.isBefore(debutApres) && now.isBefore(finApres)){
            duree = "apres_midi";
        }
        //--
//        else {
//            duree = "apres_midi";
//        }//--
        Calendar cal = Calendar.getInstance();
//        cal.set(2026, Calendar.MARCH, 13); // wad test
        cal.set(Calendar.HOUR_OF_DAY,0);
        cal.set(Calendar.MINUTE,0);
        cal.set(Calendar.SECOND,0);
        cal.set(Calendar.MILLISECOND,0);
        Date today = cal.getTime();
        Long totalPatients = rR.countByInfermierIdSansStatus(idInf,today,duree);
        Long confirme = rR.countByInfermierIdAndStatus(idInf, today, duree,Staus.Confirmer);
        Long enAttente = rR.countByInfermierIdAndStatus(idInf, today, duree,Staus.Valide);
        Long termine = rR.countByInfermierIdAndStatus(idInf, today, duree,Staus.Terminer);
        Long annule = rR.countByInfermierIdAndStatus(idInf, today, duree,Staus.anullee);
        return new DashboardInfDto(totalPatients, confirme, enAttente, termine, annule);
    }
}
