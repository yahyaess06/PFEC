package com.pfe.backend_pfe.Metier.MedecinService;

import com.pfe.backend_pfe.DTO.ConsultaionDoctoor.DossierPatMed;
import com.pfe.backend_pfe.Entities.Dossier;
import com.pfe.backend_pfe.Entities.Patient;
import com.pfe.backend_pfe.reposetory.DossierRepo;
import com.pfe.backend_pfe.reposetory.PatientRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class ConsultationImpl implements ConsultationMetier{
    private final DossierRepo dR;
    private final PatientRepo pR;

    @Override
    public DossierPatMed getByPatient(Long patId) {
        Dossier d = dR.findByPatient_Id(patId).orElse(null);

        DossierPatMed dpm = new DossierPatMed();
        dpm.setId(d.getId_dossier());
        dpm.setSanguin(d.getG_sanguin());
        dpm.setAllerges_notees(d.getAllergies_notees());
        dpm.setT_actuel(d.getTraitements_actuels());

        return dpm;
    }

    @Override
    public DossierPatMed updatePatientDossier(Long patId, DossierPatMed dossPM) {
        Dossier d = dR.findByPatient_Id(patId).orElse(null);

        if(d.getG_sanguin() == null){
            d.setG_sanguin(dossPM.getSanguin());
        }

        d.setAllergies_notees(dossPM.getAllerges_notees());
        d.setTraitements_actuels(dossPM.getT_actuel());
        dR.save(d);
        return dossPM;
    }
}
