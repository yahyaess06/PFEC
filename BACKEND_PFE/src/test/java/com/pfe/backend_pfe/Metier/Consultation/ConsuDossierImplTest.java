package com.pfe.backend_pfe.Metier.Consultation;

import com.pfe.backend_pfe.DTO.ConsultaionDoctoor.EnregestreDossierPM;
import com.pfe.backend_pfe.Entities.*;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.Exceptions.DossierNotFoundException;
import com.pfe.backend_pfe.Exceptions.RdvNontrouvableException;
import com.pfe.backend_pfe.Metier.MedecinService.ConsuDossierImpl;
import com.pfe.backend_pfe.reposetory.DossierRepo;
import com.pfe.backend_pfe.reposetory.MedicamentRepo;
import com.pfe.backend_pfe.reposetory.OrdonnanceRepo;
import com.pfe.backend_pfe.reposetory.RendezVousRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
public class ConsuDossierImplTest {
    @Mock
    private RendezVousRepo rR;
    @Mock
    private DossierRepo dR;
    @Mock
    private OrdonnanceRepo oR;
    @Mock
    private MedicamentRepo mmR;
    @InjectMocks
    private ConsuDossierImpl service;
    private EnregestreDossierPM dto;

//    @BeforeEach
//    void setUp() {
//        dto = new EnregestreDossierPM();
//        dto.set
//    }

    @Test
    void rdvNotFound(){
        when(rR.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> {
            service.saveConsultation(1L, new EnregestreDossierPM());
        });
    }

    @Test
    void dossierNotFound(){
        Rendez_Vous rdv = new Rendez_Vous();
        rdv.setPatient(new Patient());

        when(rR.findById(anyLong())).thenReturn(Optional.of(rdv));
        when(dR.findByPatient_Id(anyLong())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            service.saveConsultation(1L, new EnregestreDossierPM());
        });
    }
    @Test
    void saveConsultationSansMedicaments() throws RdvNontrouvableException, DossierNotFoundException {
        dto = new EnregestreDossierPM();
        dto.setMotif("mal de tete");
        dto.setDiagnostic("fatigue");
        dto.setDateOrd(new Date());

        Patient p = new Patient();
        p.setId(1L);
        Medecin m = new Medecin();
        m.setId(1L);
        Rendez_Vous rdv = new Rendez_Vous();
        rdv.setPatient(p);
        rdv.setMedecin(m);
        Dossier d = new Dossier();

        when(rR.findById(anyLong())).thenReturn(Optional.of(rdv));
        when(dR.findByPatient_Id(anyLong())).thenReturn(Optional.of(d));
        service.saveConsultation(1L, dto);
        verify(oR).save(any(Ordonnance.class));
        verify(rR).save(rdv);
        assertEquals(Staus.Terminer, rdv.getStaus());
    }

    @Test
    void saveConsultationAvecMedicaments() throws RdvNontrouvableException, DossierNotFoundException {
        dto = new EnregestreDossierPM();
        dto.setMotif("grippe");
        dto.setDiagnostic("virus");
        dto.setDateOrd(new Date());
        dto.setMedicaments(List.of(1L, 2L));
        Patient p = new Patient();
        p.setId(1L);
        Medecin m = new Medecin();
        m.setId(1L);
        Rendez_Vous rdv = new Rendez_Vous();
        rdv.setPatient(p);
        rdv.setMedecin(m);
        Dossier d = new Dossier();
        Medicament med1 = new Medicament();
        Medicament med2 = new Medicament();
        when(rR.findById(anyLong())).thenReturn(Optional.of(rdv));
        when(dR.findByPatient_Id(anyLong())).thenReturn(Optional.of(d));
        when(mmR.findAllById(any())).thenReturn(List.of(med1, med2));
        service.saveConsultation(1L, dto);
        verify(oR).save(argThat(o ->
                o.getMedicaments() != null &&
                        o.getMedicaments().size() == 2
        ));
    }
}
