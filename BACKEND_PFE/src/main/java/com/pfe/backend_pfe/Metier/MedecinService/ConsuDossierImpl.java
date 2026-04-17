package com.pfe.backend_pfe.Metier.MedecinService;

import com.pfe.backend_pfe.DTO.ConsultaionDoctoor.EnregestreDossierPM;
import com.pfe.backend_pfe.Entities.Dossier;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.Entities.Medicament;
import com.pfe.backend_pfe.Entities.Ordonnance;
import com.pfe.backend_pfe.Entities.Rendez_Vous;
import com.pfe.backend_pfe.Exceptions.DossierNotFoundException;
import com.pfe.backend_pfe.Exceptions.RdvNontrouvableException;
import com.pfe.backend_pfe.reposetory.DossierRepo;
import com.pfe.backend_pfe.reposetory.MedicamentRepo;
import com.pfe.backend_pfe.reposetory.OrdonnanceRepo;
import com.pfe.backend_pfe.reposetory.RendezVousRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class ConsuDossierImpl implements ConsuDossierMetier {

    private final RendezVousRepo rR;
    private final DossierRepo dR;
    private final OrdonnanceRepo oR;
    private final MedicamentRepo mmR;

    @Override
    public void saveConsultation(Long rdvId, EnregestreDossierPM saveDossierPM) throws RdvNontrouvableException, DossierNotFoundException {
        /*Rendez_Vous rdv = rR.findById(rdvId).orElseThrow(()-> new RuntimeException("Rendez Vous n 'existe pas!!!"));

        rdv.setMotif_viste(saveDossierPM.getMotif());
        //rdv.setDescription(saveDossierPM.getDescription()); mn ba3d
        rdv.setDiagnostic(saveDossierPM.getDiagnostic());
        rdv.setStaus(Staus.Terminer); //logique normalelment??!
        rR.save(rdv);*/;

//        Rendez_Vous rdv = rR.findById(rdvId).orElseThrow(()-> new RuntimeException("Rendez Vous n 'existe pas!!!"));
        Rendez_Vous rdv = rR.findById(rdvId).orElseThrow(()-> new RdvNontrouvableException("Rendez Vous n 'existe pas!!!"));
//        Dossier d = dR.findByPatient_Id(rdv.getPatient().getId()).orElseThrow(()-> new RuntimeException("Dossier n 'existe pas!!!"));
        Dossier d = dR.findByPatient_Id(rdv.getPatient().getId()).orElseThrow(()-> new DossierNotFoundException("Dossier n 'existe pas!!!"));
        Ordonnance o = new Ordonnance();
        o.setDossiers(d);
        //o.setDateOrdonnance();
        //o.setDescription();
        o.setMedecin(rdv.getMedecin());
        o.setDateOrdonnance(saveDossierPM.getDateOrd());
        o.setMotif_viste(saveDossierPM.getMotif());
        o.setDiagnostic(saveDossierPM.getDiagnostic());
        //o.setDateOrdonnance(saveDossierPM.getDateOrd());
        if(saveDossierPM.getMedicaments() != null && !saveDossierPM.getMedicaments().isEmpty())
        {
            List<Medicament> meds = mmR.findAllById(saveDossierPM.getMedicaments());
            o.setMedicaments(meds);
        }
//        rdv.setMotif_viste(saveDossierPM.getMotif());
//        rdv.setDiagnostic(saveDossierPM.getDiagnostic());
        rdv.setStaus(Staus.Terminer); //logique normalelment??!

        oR.save(o);
        rR.save(rdv);
    }
}
