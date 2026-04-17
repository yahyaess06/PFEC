package com.pfe.backend_pfe.Metier.Rdvs;

import com.pfe.backend_pfe.DTO.*;
import com.pfe.backend_pfe.DTO.AdministrateurRdvs.PagerDto;
import com.pfe.backend_pfe.DTO.AdministrateurRdvs.Pagerr;
import com.pfe.backend_pfe.DTO.AdministrateurRdvs.RdvsAdDto;
import com.pfe.backend_pfe.DTO.AdministrateurRdvs.RdvsAdminDto;
import com.pfe.backend_pfe.Entities.*;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.Exceptions.*;
import com.pfe.backend_pfe.Exceptions.RdvNontrouvableException;
import com.pfe.backend_pfe.Mappers.RdvsMappers;
import com.pfe.backend_pfe.reposetory.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.*;


@Service
@Transactional
@AllArgsConstructor
public class RdvsService implements IRdvsService{
   private final RendezVousRepo rdvr;
   private final PatientRepo patientRepo;
   private final RdvsMappers rdm;
   private final MedcineRepo mr;
   private final Hopitalrepo hr;
   private final DossierRepo dossierRepo;
   private final InfermierRepo infermierRepo;
   private final PersonnelRepo pR;

    @Override
    public List<RdvsDto> getRdvs(Long id) {
        List<Rendez_Vous> rdvs=rdvr.findAllByPatientIdAndContainsMedecinId(id);
        List<RdvsDto> rdtos=rdvs.stream().
                map(rdv->rdm.rdvsTodto(rdv))
                .toList();
 for(RdvsDto rdto:rdtos){
     for(Rendez_Vous rdv:rdvs){
    if(rdv.getId().equals(rdto.getId())){
     rdto.setNomfdoc(mr.findNomById(rdvr.FindMedcinById(rdv.getId())));
            rdto.setDocSpecialite(mr.findSpecialiteByMedcinId(rdvr.FindMedcinById(rdv.getId())));
     break;
    }
     }
 }
return rdtos;
    }
        @Override
        public List<VrdvDto> getVaccinRdv(Long id){
            List<Rendez_Vous> vrdvs=rdvr.findAllByPatientIdAndContainsInfermierId(id);
            List<VrdvDto> rdtos=vrdvs.stream().
                    map(rdv->rdm.rdvsTovdto(rdv))
                    .toList();
            for(VrdvDto rdto:rdtos){
                for(Rendez_Vous rdv:vrdvs) {
                    if (rdv.getId().equals(rdto.getId())) {
                        rdto.setNomInfermier(infermierRepo.findNomById(rdvr.FindInfermierById(rdv.getId())));
                        break;
                    }
                }}
            return rdtos;
        }

    @Override
    public void actionAnnule(Long id) throws RdvNontrouvableException {
           Rendez_Vous rdv = rdvr.findById(id).orElseThrow(()->new RdvNontrouvableException("rdv not found exception"));
           rdv.setStaus(Staus.anullee);
           rdvr.save(rdv);
    }

    @Override
    public void actionConfirmer(Long id) throws RdvNontrouvableException {
        Rendez_Vous rdv = rdvr.findById(id).orElseThrow(()->new RdvNontrouvableException("rdv not found exception"));
        rdv.setStaus(Staus.Confirmer);
        rdvr.save(rdv);
    }

    @Override
    public List<RdvsMedcinDto> voireRdvsMedcin(Long id){
       String duree="";
        LocalTime heurMaintenant = LocalTime.now();
//        LocalTime heurMaintenant = LocalTime.of(15,0);
        LocalTime debutmatin=LocalTime.of(8,0);
        LocalTime finmatin=LocalTime.of(10,0);
        LocalTime debutApresMedi=LocalTime.of(10,1);
        LocalTime finApresMedi=LocalTime.of(7,0);
        //3la wdit medecin ichof les rdv 9bal 8
//        if(heurMaintenant.isBefore(debutmatin)){
//            duree="matin";
//        }
        if (!heurMaintenant.isBefore(debutmatin)&& heurMaintenant.isBefore(finmatin)){
             duree="matin";
        } else if (
//                !heurMaintenant.isBefore(debutApresMedi) && heurMaintenant.isBefore(finApresMedi)
                !heurMaintenant.isBefore(debutApresMedi)
                        || heurMaintenant.isBefore(finApresMedi)
        ){
            duree="apres_midi";
        }
        Calendar calendrier=Calendar.getInstance();
//        calendrier.set(2026, Calendar.MARCH, 13);//3la wa test
        calendrier.set(Calendar.HOUR_OF_DAY,0);
        calendrier.set(Calendar.MINUTE,0);
        calendrier.set(Calendar.SECOND,0);
        calendrier.set(Calendar.MILLISECOND,0);
        Date datesansheurs=calendrier.getTime();
        List<Rendez_Vous> rdvs=rdvr.findByMedecinIdAndDate_rendez_vousAndDureerendezvous(id,datesansheurs,duree);
        List<RdvsMedcinDto> listDtos=new ArrayList<>();
        rdvs.forEach(rdv->{
            RdvsMedcinDto dto=new RdvsMedcinDto();
            dto.setDescription(rdv.getDescription());
            dto.setStatus(rdv.getStaus());
            dto.setPrenomPatient(rdv.getPatient().getPrenom());
            dto.setNomPatient(rdv.getPatient().getNom());
            dto.setRdvId(rdv.getId());
            dto.setNumRdv(rdv.getNumrdv());
            //hado ana li zadthom 3la hasab Gynecologie
            dto.setCin(rdv.getPatient().getCin());
            dto.setNbMoins(rdv.getNbMoins());
            dto.setPriority(rdv.isPriority());
            dto.setSpecialite(rdv.getMedecin().getSpecialite().getNomspec());
            //---
            dto.setDuree(rdv.getDureerendezvous());
            //dto.setCin(rdv.getPatient().getCin());
            listDtos.add(dto);
        });
  return listDtos;
    }

    @Override
    public CountDto voireRdvTotal(Long id){
        String duree="";
        LocalTime heurMaintenant = LocalTime.now();
//        LocalTime heurMaintenant = LocalTime.of(15,0);//3la wad test
        LocalTime debutmatin=LocalTime.of(8,0);
        LocalTime finmatin=LocalTime.of(11,0);
        LocalTime debutApresMedi=LocalTime.of(11,0);
//        LocalTime finApresMedi=LocalTime.of(3,0);
        LocalTime finApresMedi=LocalTime.of(18,0);
 //       LocalTime finApresMedi=LocalTime.of(18,0);
        if (!heurMaintenant.isBefore(debutmatin)&& heurMaintenant.isBefore(finmatin)){
            duree="matin";
        } else if (
                !heurMaintenant.isBefore(debutApresMedi)
                        || heurMaintenant.isBefore(finApresMedi)) {
            duree="apres_midi";
        }
        Calendar calendrier=Calendar.getInstance();
//        calendrier.set(2026,Calendar.MARCH, 13);//3la wad test
        calendrier.set(Calendar.HOUR_OF_DAY,0);
        calendrier.set(Calendar.MINUTE,0);
        calendrier.set(Calendar.SECOND,0);
        calendrier.set(Calendar.MILLISECOND,0);
        Date datesansheurs=calendrier.getTime();
        CountDto countDto=new CountDto();
        countDto.setCountRdvTotal(rdvr.FindNumberRendezVousByMedecinIdSansStatus(id,datesansheurs,duree));
        countDto.setCountRdvenAttend(rdvr.FindNumberRendezVousByMedecinId(id,datesansheurs,duree,Staus.Valide));
        countDto.setCountRdvterminer(rdvr.FindNumberRendezVousByMedecinId(id,datesansheurs,duree,Staus.Terminer));
        return countDto;
    }

    @Override
    public void prendreRdv(Prenrdvdto prdv) throws HoptialNotfoundException, HopitalFullException, MedcinNotFoundException, PatientNotfoundException, DossierNotFoundException, DateDejaPasseException, RdvDupliquerException {

        Calendar calendrier = Calendar.getInstance();
        calendrier.setTime(prdv.getDate());

        calendrier.set(Calendar.HOUR_OF_DAY, 0);
        calendrier.set(Calendar.MINUTE, 0);
        calendrier.set(Calendar.SECOND, 0);
        calendrier.set(Calendar.MILLISECOND, 0);

        Date dateSansHeure = calendrier.getTime();
        if(dateSansHeure.before(new Date())){
            throw new DateDejaPasseException("erreur, vous avez choisie une date deja passer");
        }
        if (rdvr.existsRendezVousAfterDateAndSpecialite(
                prdv.getPatientId(),
                dateSansHeure,
                prdv.getSpecialite())>0) {
            throw new RdvDupliquerException("Vous ne pouvez pas prendre deux rendez-vous.");
        }
        Hopital hop=hr.findById(prdv.getIdHopital()).orElseThrow(()-> new HoptialNotfoundException("Hopital introuvable !"));
        List<Medecin> med=mr.findBySpecialite(prdv.getSpecialite(),prdv.getIdHopital());
        if(med.isEmpty()){
            throw new MedcinNotFoundException("y a pas de medcins pour cette specialite");}
        Map<Medecin,Long> mrdv=new HashMap<>();// pour que chaque medcin avoire c'est rdvs
        Iterator<Medecin> it = med.iterator();
        String period=prdv.getPeriode().toLowerCase(Locale.ROOT);
        while (it.hasNext()) {
            Medecin m = it.next();
            Long nbrdvs = rdvr.FindNumberRendezVousByMedecinId(m.getId(), dateSansHeure, period,Staus.Valide);
            if(nbrdvs==null){
                nbrdvs=0L;
            }
            if (nbrdvs >= 30L) {
                it.remove();
            }else{
            mrdv.put(m,nbrdvs);}}
        if (mrdv.isEmpty()){
            throw new HopitalFullException("hopital plein !");}
        Long rdvpluspetit=Long.MAX_VALUE;
        Medecin me=null;
        Long numrdvpourmedcin=0L;

//        Dossier d=dossierRepo.findByPatient_Id(prdv.getPatientId()).orElseThrow(()->new DossierNotFoundException("dossier non trouvee !"));
        for(Map.Entry<Medecin,Long> entry: mrdv.entrySet()){
            Long rdvs=entry.getValue();
            if(rdvs<rdvpluspetit){
                rdvpluspetit=rdvs;
                me=entry.getKey();
                numrdvpourmedcin=entry.getValue();
//                break;
            }}
        Rendez_Vous rdv= Rendez_Vous.builder()
                .hopital(hop)
                .staus(Staus.Valide)
                .medecin(me)
                .date_rendez_vous(dateSansHeure)
                .numrdv(numrdvpourmedcin+1)
                .description(prdv.getDesciption())
                .patient(patientRepo.findById(prdv.getPatientId()).orElseThrow(()->new PatientNotfoundException("Patient non trouvee")))
                .dureerendezvous(period)

//                .dossieR(d)
                .build();
        if (period.equals("matin")){
rdv.setHeurerendezvous(10);
        }else {
            rdv.setHeurerendezvous(15);
        }
        rdvr.save(rdv);
//        Collection<Medecin> meds= d.getMedecins();
//        if(meds==null){
//            meds=new ArrayList<>();
//            d.setMedecins(meds);
//        }
//        if(!meds.contains(me)){
//        meds.add(me);
//        }
//        d.setMedecins(meds);
//            dossierRepo.save(d);
//        if (me!=null){
//        me.setDossier(d);
//        mr.save(me);
//        }
    }
    @Override
    public VoirdetailsVaccinDto voirdetailsVaccinDto(Long id) throws RdvNontrouvableException {
        Rendez_Vous rdv=rdvr.findById(id).orElseThrow(()->new RdvNontrouvableException("rendez vous non trouvee !!"));
        VoirdetailsVaccinDto rdto=new VoirdetailsVaccinDto();
        rdto.setNomPatient(rdv.getPatient().getNom());
        rdto.setPrenomPatient(rdv.getPatient().getPrenom());
        rdto.setCinPatient(rdv.getPatient().getCin());
        rdto.setDescription(rdv.getDescription());
        rdto.setDate(rdv.getDate_rendez_vous());
        rdto.setPeriod(rdv.getDureerendezvous());
        rdto.setNumeroPatient(rdv.getNumrdv());
        rdto.setNomInfermier(rdv.getInfermier().getNom());
        rdto.setPrenomInfermier(rdv.getInfermier().getPrenom());
        rdto.setNomHopital(rdv.getHopital().getNom_hopital());
        rdto.setAdresseHopital(rdv.getHopital().getLocal());
        rdto.setStatus(rdv.getStaus());
            return rdto;
    }
    @Override
    public VoireRdvDto voireRdv(Long id) throws RdvNontrouvableException {
       Rendez_Vous rdv=rdvr.findById(id).orElseThrow(()->new RdvNontrouvableException("rendez vous non trouvee !!"));
        VoireRdvDto rdvdto=new VoireRdvDto();
        rdvdto.setNomPatient(rdv.getPatient().getNom());
        rdvdto.setPrenomPatient(rdv.getPatient().getPrenom());
        rdvdto.setCinPatient(rdv.getPatient().getCin());
        rdvdto.setDescription(rdv.getDescription());
        rdvdto.setDate(rdv.getDate_rendez_vous());
        rdvdto.setPeriod(rdv.getDureerendezvous());
        rdvdto.setNumeroPatient(rdv.getNumrdv());
        rdvdto.setNomDoc(rdv.getMedecin().getNom());
        rdvdto.setPrenomDoc(rdv.getMedecin().getPrenom());
        rdvdto.setNomHopital(rdv.getHopital().getNom_hopital());
        rdvdto.setAdresseHopital(rdv.getHopital().getLocal());
        rdvdto.setStatus(rdv.getStaus());
        rdvdto.setNbMoins(rdv.getNbMoins());
        return rdvdto;
    }

    @Override
    public void vacinRdv(VaccinRdvDto vdto) throws HoptialNotfoundException, InfermierIntrouvableException, HopitalFullException, DossierNotFoundException, PatientNotfoundException, DateDejaPasseException, RdvDupliquerException {

        Calendar calendrier = Calendar.getInstance();
        calendrier.setTime(vdto.getDate());

        calendrier.set(Calendar.HOUR_OF_DAY, 0);
        calendrier.set(Calendar.MINUTE, 0);
        calendrier.set(Calendar.SECOND, 0);
        calendrier.set(Calendar.MILLISECOND, 0);

        Date dateSansHeure = calendrier.getTime();
        if(dateSansHeure.before(new Date())){
            throw new DateDejaPasseException("erreur, vous avez choisie une date deja passer");
        }
        String type = "Soins";
        if (rdvr.existsRendezVousInfAfterDateAndSpecialite(
                vdto.getPatientId(),
                dateSansHeure,type )>0) {
            throw new RdvDupliquerException("Vous ne pouvez pas prendre deux rendez-vous.");
        }


        Hopital hop = hr.findById(vdto.getHopitalId())
                .orElseThrow(() -> new HoptialNotfoundException("Hopital introuvable !"));

        List<Infermier> infs = infermierRepo.findBySpecialite(type, vdto.getHopitalId());

        if (infs.isEmpty()) {
            throw new InfermierIntrouvableException("infermier introuvable");
        }
        Map<Infermier, Long> irdv = new HashMap<>();
        Iterator<Infermier> it = infs.iterator();
        String period=vdto.getPeriod().toLowerCase(Locale.ROOT).replace("-","_");//zadt replace() hit f db period katktab apres-midi o f code apres_midi
        while (it.hasNext()) {
            Infermier inf = it.next();
            Long nbrdvs = rdvr.FindNumberRendezVousByInfermierId(
                    inf.getId(),
                    dateSansHeure,//changement ici
                    period,
                    Staus.Valide
            );
            if (nbrdvs == null) nbrdvs = 0L;
            if (nbrdvs >= 30L) {
                it.remove();
            } else {
                irdv.put(inf, nbrdvs);
            }
        }
        if (irdv.isEmpty()) {
            throw new HopitalFullException("hopital plein !");
        }
        Long rdvPlusPetit = Long.MAX_VALUE;
        Infermier Inf = null;
        Long numRdvPourInf = 0L;

        for (Map.Entry<Infermier, Long> entry : irdv.entrySet()) {
            Long rdvs = entry.getValue();
            if (rdvs < rdvPlusPetit) {
                rdvPlusPetit = rdvs;
                Inf = entry.getKey();
                numRdvPourInf = rdvs;
            }
        }

        Dossier d = dossierRepo.findByPatient_Id(vdto.getPatientId())
                .orElseThrow(() -> new DossierNotFoundException("dossier non trouvee !"));
        Patient p = patientRepo.findById(vdto.getPatientId())
                .orElseThrow(() -> new PatientNotfoundException("Patient non trouvee"));
        Rendez_Vous rdv = Rendez_Vous.builder()
                .hopital(hop)
                .staus(Staus.Valide)
                .infermier(Inf)
                //.date_rendez_vous(vdto.getDate())
                .date_rendez_vous(dateSansHeure)//zadtha hta 3la wad test mais khasha tkon lah9ach kat returni date bla sway3
                .numrdv(numRdvPourInf + 1)
                .description(vdto.getDescription()) // adapte le getter
                .patient(p)
                .dureerendezvous(period)
//                .dossieR(d)
                .build();
        if (period.equals("matin")){
            rdv.setHeurerendezvous(10);
        }else {
            rdv.setHeurerendezvous(15);
        }
        rdvr.save(rdv);
//        Collection<Infermier> infermiers = d.getInfermier();
//        if (infermiers == null) {
//            infermiers = new ArrayList<>();
//            d.setInfermier(infermiers);
//        }
//        if (!infermiers.contains(Inf)) {
//            infermiers.add(Inf);
//        }
//        dossierRepo.save(d);
//        if (Inf != null) {
//            Inf.setDossierI(d);
//            infermierRepo.save(Inf);
//        }
    }


    @Override
    public PagerDto voireRdvsParjour(Long id,Date date, String departement, Staus s,int page,int size) throws PersonnelNotFOundException, RdvsJourException {
        Personnel p=pR.findById(id).orElseThrow(()->new PersonnelNotFOundException("Personnel not found"));
        if (departement == null) {
            departement = "";
        }
        Page<RdvsAdminDto> rdvs=rdvr.findRendezVousByParams(p.getHopital().getId_hopital(),date,departement,s, PageRequest.of(page, size));
        if (rdvs.isEmpty()) {
            throw new RdvsJourException("Rdvs not found");
        }
        PagerDto dto=new PagerDto();
        dto.setAds(rdvs.getContent());
        dto.setPageSize(size);
        dto.setCurrentPage(page);
        dto.setTotalPages(rdvs.getTotalPages());
        return dto;
    }
    @Override
    public Pagerr voireRdvsParjourInf(Long id, Date date, int page, int size, Staus s) throws PersonnelNotFOundException, RdvsJourException {
        Personnel p=pR.findById(id).orElseThrow(()->new PersonnelNotFOundException("Personnel not found"));
        Page<RdvsAdDto> rdvs=rdvr.findRdvsInfermier(p.getHopital().getId_hopital(),date,s, PageRequest.of(page, size));
        if (rdvs.isEmpty()) {
            throw new RdvsJourException("Rdvs not found");
        }
        Pagerr dto=new Pagerr();
        dto.setAds(rdvs.getContent());
        dto.setPageSize(size);
        dto.setCurrentPage(page);
        dto.setTotalPages(rdvs.getTotalPages());
        return dto;
    }

    @Override
    public NombreDto voireNbDtoNotification(Long id) throws RdvsJourException {

        Calendar calendrier = Calendar.getInstance();
        calendrier.setTime(new Date());

        calendrier.set(Calendar.HOUR_OF_DAY, 0);
        calendrier.set(Calendar.MINUTE, 0);
        calendrier.set(Calendar.SECOND, 0);
        calendrier.set(Calendar.MILLISECOND, 0);

        Date dateSansHeure = calendrier.getTime();

        NombreDto dto=new NombreDto();
        List<Rendez_Vous> nextRv = rdvr.findNextRendezVousnot(id);
        if(nextRv.isEmpty()){
            throw new RdvsJourException("ya pas rdv");
        }
        Rendez_Vous r = nextRv.get(0);
        Long numrdv=r.getNumrdv();
        Long rdvsterminer=rdvr.FindNumberRendezVousByMedecinId(r.getMedecin().getId(),r.getDate_rendez_vous(),r.getDureerendezvous(),Staus.Terminer);
        if (rdvsterminer == null) rdvsterminer = 0L;
        Long rdvsannuler=rdvr.FindNumberRendezVousByMedecinId(r.getMedecin().getId(),r.getDate_rendez_vous(),r.getDureerendezvous(),Staus.anullee);
        Long rdvavantpatient=numrdv-1;
        long rest=rdvavantpatient-rdvsterminer-rdvsannuler;

        if(dateSansHeure.equals(r.getDate_rendez_vous())) {
            if (
                    rest >= 2 && rest <= 10
            ) {
                dto.setKrib(true);
                dto.setNombre(rest);
                dto.setMessage("Vous avez devant vous " + rest + " patients, soyer prete");
            } else if (rest==1) {
                dto.setKrib(true);
                dto.setNombre(rest);
                dto.setMessage("Soyez prete, votre tourne est apres : " + rest);
            } else if (rest==0) {
                dto.setKrib(true);
                dto.setNombre(rest);
                dto.setMessage("Votre tourne, s'il vous plait entrer chez le docteur ");
            } else if (rest < 0 && r.getStaus() == Staus.anullee) {
                dto.setKrib(true);
                dto.setNombre(rest);
                dto.setMessage("Votre Rendez vous est annuller car vous etes abscent! ");
            } else {
                dto.setKrib(false);
                dto.setMessage("y a pas de notification");
            }
        }else{
            dto.setKrib(false);
            dto.setNombre(rest);
            dto.setMessage("y a pas de notification, votre rendez vous est loin encore. ");
        }
    return dto;
    }

}
