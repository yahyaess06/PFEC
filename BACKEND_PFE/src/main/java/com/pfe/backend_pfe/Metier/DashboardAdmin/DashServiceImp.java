package com.pfe.backend_pfe.Metier.DashboardAdmin;


import com.pfe.backend_pfe.DTO.DashboardAdministrateur.CountsDto;
import com.pfe.backend_pfe.DTO.DashboardAdministrateur.PourcentageDto;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.Entities.Personnel;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;
import com.pfe.backend_pfe.reposetory.InfermierRepo;
import com.pfe.backend_pfe.reposetory.MedcineRepo;
import com.pfe.backend_pfe.reposetory.PersonnelRepo;
import com.pfe.backend_pfe.reposetory.RendezVousRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;

@Service
@Transactional
@RequiredArgsConstructor
public class DashServiceImp implements IdashService{
    private final PersonnelRepo pr;
    private final RendezVousRepo rp;
    private final MedcineRepo mp;
    private final InfermierRepo ip;

    @Override
    public CountsDto getCounts(Long id) throws PersonnelNotFOundException {
        Personnel p=pr.findById(id).orElseThrow(()->new PersonnelNotFOundException("Personnel not found"));
        CountsDto counts=new CountsDto();
        LocalDate now = LocalDate.now();
        LocalDate start = now.withDayOfMonth(1);
        LocalDate nextMonth = start.plusMonths(1);
        Date lwla = Date.from(start.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date tania = Date.from(nextMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());
        counts.setTotalPatient(rp.FindCountPatient(p.getHopital().getId_hopital(),lwla,tania));
counts.setTotalDoctor(mp.findCountByHopitalID(p.getHopital().getId_hopital()));
counts.setConsultationsparmois(rp.FindCountRdvsparmois(p.getHopital().getId_hopital(),lwla,tania, Staus.Terminer));
counts.setCountrdvAnnuler(rp.FindCountRdvsparmois(p.getHopital().getId_hopital(),lwla,tania, Staus.anullee));
counts.setCountrdvConfirmer(rp.FindCountRdvsparmois(p.getHopital().getId_hopital(),lwla,tania, Staus.Confirmer));
        Calendar calendrier=Calendar.getInstance();
        calendrier.set(Calendar.HOUR_OF_DAY,0);
        calendrier.set(Calendar.MINUTE,0);
        calendrier.set(Calendar.SECOND,0);
        calendrier.set(Calendar.MILLISECOND,0);
        Date datesansheurs=calendrier.getTime();

counts.setRdvEnattend(rp.findRdvattentCount(Staus.Valide,datesansheurs));
counts.setCountInfermiers(ip.countInfsByHopitalID(p.getHopital().getId_hopital()));
counts.setRdvLyom(rp.findRdvcountbydate(datesansheurs));
        return counts;
    }

    @Override
    public PourcentageDto getPourcentage(Long id,Date date) throws PersonnelNotFOundException {
        Date datesansheurs;
        if (date==null){
            Calendar calendrier=Calendar.getInstance();
            calendrier.set(Calendar.HOUR_OF_DAY,0);
            calendrier.set(Calendar.MINUTE,0);
            calendrier.set(Calendar.SECOND,0);
            calendrier.set(Calendar.MILLISECOND,0);
            datesansheurs=calendrier.getTime();
        }else {
        datesansheurs=date;
        }
        Personnel p=pr.findById(id).orElseThrow(()->new PersonnelNotFOundException("Personnel not found"));
PourcentageDto pourcentage=new PourcentageDto();
pourcentage.setPourcentageCardio(rp.findRdvsBySpec("Cardiologie",Staus.Terminer,datesansheurs));
        pourcentage.setPourcentageDer(rp.findRdvsBySpec("Dermatologie",Staus.Terminer,datesansheurs));
        pourcentage.setPourcentageGyne(rp.findRdvsBySpec("Gynécologie",Staus.Terminer,datesansheurs));
        pourcentage.setPourcentageGenerale(rp.findRdvsBySpec("Médecine générale",Staus.Terminer,datesansheurs));
        pourcentage.setPourcentageNeu(rp.findRdvsBySpec("Neurologie",Staus.Terminer,datesansheurs));
        return pourcentage;
    }
}
