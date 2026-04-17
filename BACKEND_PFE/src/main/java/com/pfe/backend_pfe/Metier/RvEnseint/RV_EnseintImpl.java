package com.pfe.backend_pfe.Metier.RvEnseint;

import com.pfe.backend_pfe.DTO.RV_EnseintDto.EnseintDto;
import com.pfe.backend_pfe.Entities.*;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.Exceptions.*;
import com.pfe.backend_pfe.reposetory.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@AllArgsConstructor
public class RV_EnseintImpl implements Rv_EnseintMetier{

    private final RendezVousRepo rv;
    private final PatientRepo pR;
    private final MedcineRepo mR;
    private final DossierRepo dR;
    private final Hopitalrepo hR;
    //private final UserReposetory uR;

    @Override
    public void saveRvEnseint(EnseintDto enseintDto) throws HospitalNotFound, PatientNotfoundException, HoptialNotfoundException, GynecologeNotFound, DossierNotFoundException {

        Calendar calendrier = Calendar.getInstance();
        calendrier.setTime(enseintDto.getDate());

        calendrier.set(Calendar.HOUR_OF_DAY, 0);
        calendrier.set(Calendar.MINUTE, 0);
        calendrier.set(Calendar.SECOND, 0);
        calendrier.set(Calendar.MILLISECOND, 0);

        Date dateSansHeure = calendrier.getTime();

        //addedd
        Calendar lyoum = Calendar.getInstance();
        lyoum.set(Calendar.HOUR_OF_DAY, 0);
        lyoum.set(Calendar.MINUTE, 0);
        lyoum.set(Calendar.SECOND, 0);
        lyoum.set(Calendar.MILLISECOND, 0);
        Date today = lyoum.getTime();
        if(!dateSansHeure.after(today)) {
            throw new HospitalNotFound("Le rendez vous doit etre a partir de demain");
        }
        //------

        Patient p = pR.findById(enseintDto.getPatientId()).orElseThrow(()-> new PatientNotfoundException("Patient not found"));
//---
        Long dejaRdv = rv.countByPatientAndDate(p.getId(), dateSansHeure);

        if(dejaRdv != null && dejaRdv > 0){
            throw new HospitalNotFound("patient a deja un rendez vous ce jour");
        }
        //---
        Hopital h = hR.findById(enseintDto.getHopitalId()).orElseThrow(
                () -> new HoptialNotfoundException("Hopital est introuvabl"));

        List<Medecin> gynecologues = mR.findGynecologuesByHopital(h.getId_hopital());

        if (gynecologues.isEmpty()) {
            throw new GynecologeNotFound("Aucune gynecologe disponible");
        }

        boolean urgent = (enseintDto.getNbMoins() == 8 || enseintDto.getNbMoins() == 9);
        Map<Medecin, Long> medMap = new HashMap<>();
        Iterator<Medecin> it = gynecologues.iterator();
        while (it.hasNext())
        {
            Medecin m = it.next();
            Long nbr;
            Long urgCount;
            if(urgent){
                urgCount = rv.countUrgentByMedecinAndDate(m.getId(),dateSansHeure);
                if(urgCount == null) urgCount=0L;
                if(urgCount >= 3){
                    it.remove();
                    continue;
                }
                nbr=urgCount;
            }else{
                if(enseintDto.getPeriode() == null){
                    throw new HospitalNotFound("Periode Obligee!!");
                }
                nbr = rv.FindNumberRendezVousByMedecinId(m.getId(),dateSansHeure,enseintDto.getPeriode().toLowerCase(),Staus.Valide);
                if(nbr == null) nbr=0L;
                if(nbr >= 30L){
                    it.remove();
                    continue;
                }
            }
            medMap.put(m,nbr);
        }
        if (medMap.isEmpty())
        {
            throw new HospitalNotFound("hopital est pleine!!!");
        }

        Long min = Long.MAX_VALUE;
        Medecin med = null;

        for(Map.Entry<Medecin, Long> entry : medMap.entrySet()){
            if (entry.getValue() < min){
                min = entry.getValue();
                med = entry.getKey();
            }
        }

        Dossier d = dR.findByPatient_Id(enseintDto.getPatientId())
                .orElseThrow(() -> new DossierNotFoundException("Dossier est intruuvable"));

        Rendez_Vous rdv = Rendez_Vous.builder()
//                .date_rendez_vous(enseintDto.getDate())
                .date_rendez_vous(dateSansHeure)
                .hopital(h)
                .nbMoins(enseintDto.getNbMoins())
//                .question(enseintDto.getQuestion())
                .medecin(med)
                .staus(Staus.Valide)
                .patient(p)
                .description(enseintDto.getDescription())
                .build();
        if(urgent){
            rdv.setPriority(true);
            rdv.setNumrdv(min+1);
            //rdv.setDureerendezvous("urgent");
            rdv.setDureerendezvous(enseintDto.getPeriode().toLowerCase());
            rdv.setHeurerendezvous(9);//awal sa3a f sbah
        }else{
            rdv.setPriority(false);
            rdv.setNumrdv(min+1);
            rdv.setDureerendezvous(enseintDto.getPeriode().toLowerCase());
            if(enseintDto.getPeriode().equalsIgnoreCase("matin")){
                rdv.setHeurerendezvous(10);
            }
            else {
                rdv.setHeurerendezvous(15);
            }
        }
        rv.save(rdv);
    }
}
