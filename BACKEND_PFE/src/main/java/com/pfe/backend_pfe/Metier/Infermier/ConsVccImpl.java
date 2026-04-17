package com.pfe.backend_pfe.Metier.Infermier;

import com.pfe.backend_pfe.DTO.InfirmierRdvDto.VaccinationConsDto;
import com.pfe.backend_pfe.Entities.Dossier;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.Entities.Infermier;
import com.pfe.backend_pfe.Entities.Rendez_Vous;
import com.pfe.backend_pfe.Entities.Vaccination;
import com.pfe.backend_pfe.Exceptions.DossierNotFoundException;
import com.pfe.backend_pfe.reposetory.DossierRepo;
import com.pfe.backend_pfe.reposetory.InfermierRepo;
import com.pfe.backend_pfe.reposetory.RendezVousRepo;
import com.pfe.backend_pfe.reposetory.VaccinationRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional
@AllArgsConstructor
public class ConsVccImpl implements ConsVccMetier{
    private final VaccinationRepo vR;
    private final DossierRepo dR;
    private final InfermierRepo iR;
    private final RendezVousRepo rR;

    @Override
    public Vaccination createVcc(VaccinationConsDto vDto, Long idInf) throws DossierNotFoundException {
        Dossier d = dR.findById(vDto.getDossierId()).orElseThrow(()-> new DossierNotFoundException("Dossier not found"));
        Infermier i = iR.findById(idInf).orElseThrow(()-> new RuntimeException("Infermier not found"));
        Vaccination v = new Vaccination();
        v.setDateVaccin(new Date());
        v.setNomVaccin(vDto.getNomVaccin());
        v.setMotif(vDto.getMotif());
        v.setObservation(vDto.getObservation());
        v.setDossierV(d);
        v.setInfermierV(i);
        Vaccination s = vR.save(v);
        Rendez_Vous rdv = rR.findAllByPatient_Id(d.getPatient().getId())
                .stream().filter(r->r.getStaus() == Staus.Confirmer).findFirst().orElse(null);
        if(rdv != null) {
            rdv.setStaus(Staus.Terminer);
            rR.save(rdv);
        }

//        Rendez_Vous rdv = null;
//
//        for (Rendez_Vous r : rdvRepo.findAllByPatient_Id(dossier.getPatient().getId())) {
//            if (r.getStaus() == Staus.Confirmer) {
//                rdv = r;
//                break; // باش توقف ملي تلقى أول واحد
//            }
//        }
//
//        if (rdv != null) {
//            rdv.setStaus(Staus.Terminer);
//            rdvRepo.save(rdv);
//        }
        return s;
    }
}
