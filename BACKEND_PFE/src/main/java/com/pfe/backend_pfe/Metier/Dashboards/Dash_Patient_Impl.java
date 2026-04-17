package com.pfe.backend_pfe.Metier.Dashboards;

import com.pfe.backend_pfe.DTO.Dash_PatientDto;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.Entities.Medecin;
import com.pfe.backend_pfe.Entities.Rendez_Vous;
import com.pfe.backend_pfe.reposetory.MedcineRepo;
import com.pfe.backend_pfe.reposetory.RendezVousRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class Dash_Patient_Impl implements Dash_Patient_Metier{

    private final RendezVousRepo rdvRepo;
    private final MedcineRepo medcineRepo;

    @Override
    public Dash_PatientDto getDash_Patient(Long patient_id) {

        Dash_PatientDto dash_PatientDto = new Dash_PatientDto();

        dash_PatientDto.setRdvAVenir(
                rdvRepo.countRdvAVenir(patient_id)
        );

        dash_PatientDto.setRdvTermines(
                rdvRepo.countRendez_VousByStatus(patient_id, Staus.Terminer)
        );

        List<Rendez_Vous> nextRv = rdvRepo.findNextRendezVous(patient_id);
        if(!nextRv.isEmpty())
        {
            Rendez_Vous r = nextRv.get(0);
            Dash_PatientDto.ProchainRdv pRv = new Dash_PatientDto.ProchainRdv();
            pRv.setDate(r.getDate_rendez_vous());

            if (r.getMedecin() != null)
            {
                pRv.setNomMedecin(r.getMedecin().getNom() + " " + r.getMedecin().getPrenom());
                pRv.setSpecialite(r.getMedecin().getSpecialite().getNomspec());
                pRv.setPeriode(r.getDureerendezvous());
                pRv.setNbrRdv(r.getNumrdv());
            }

            if(r.getInfermier() != null){
                pRv.setNomInfermier(r.getInfermier().getNom() + " " + r.getInfermier().getPrenom());
                pRv.setSpecialite(r.getInfermier().getSpecialite());
                pRv.setPeriode(r.getDureerendezvous());
                pRv.setNbrRdv(r.getNumrdv());
            }
            dash_PatientDto.setProchainRdv(pRv);
        }

        return dash_PatientDto;
    }
}
