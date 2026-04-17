package com.pfe.backend_pfe.Metier.Dashboards;

import com.pfe.backend_pfe.DTO.Dash_MedecinDto;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.Entities.Rendez_Vous;
import com.pfe.backend_pfe.reposetory.RendezVousRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.Calendar;
import java.util.Date;

@Service
@AllArgsConstructor
@Transactional
public class Dash_MedecinImpl implements Dash_Medecin_Metier{
    private final RendezVousRepo rR;

    @Override
    public Dash_MedecinDto getDash_Medecin(Long medId) {

        Dash_MedecinDto dDtoMed = new Dash_MedecinDto();
        String duree="";
        LocalTime now = LocalTime.now();
//        LocalTime now = LocalTime.of(15,0);//3la wad test
        LocalTime debutMatin = LocalTime.of(8,0);
        LocalTime finMatin = LocalTime.of(12,0);
        LocalTime debutApres = LocalTime.of(14,0);
        LocalTime finApres = LocalTime.of(18,0);
        if(!now.isBefore(debutMatin) && now.isBefore(finMatin)){
            duree="matin";
        }
        else if(!now.isBefore(debutApres) && now.isBefore(finApres)){
            duree="apres_midi";
        }
        //--
         else{
            duree="apres_midi";
        }//--
        System.out.println("duree = " + duree);
        Calendar cal = Calendar.getInstance();
//        cal.set(2026,Calendar.MARCH, 13);//wad test
        cal.set(Calendar.HOUR_OF_DAY,0);
        cal.set(Calendar.MINUTE,0);
        cal.set(Calendar.SECOND,0);
        cal.set(Calendar.MILLISECOND,0);
        Date today = cal.getTime();

        dDtoMed.setTotalPatients(
                rR.countTotalToday(medId,today,duree)
        );

        dDtoMed.setRdvTermine(
                rR.countTodayByStatus(medId,today,duree, Staus.Terminer)
        );

        dDtoMed.setRdvAnnulee(
                rR.countTodayByStatus(medId,today,duree, Staus.anullee)
        );

        dDtoMed.setRdvConfirme(
                rR.countTodayByStatus(medId,today,duree, Staus.Confirmer)
        );
        dDtoMed.setRdvEnAttente(
                rR.countTodayByStatus(medId,today,duree, Staus.Valide)
        );

        return dDtoMed;
    }
}
