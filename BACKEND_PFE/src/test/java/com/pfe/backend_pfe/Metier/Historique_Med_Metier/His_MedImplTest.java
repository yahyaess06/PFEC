package com.pfe.backend_pfe.Metier.Historique_Med_Metier;

import com.pfe.backend_pfe.DTO.HistoriqueMedicalPatient.H_MedicalDto;
import com.pfe.backend_pfe.DTO.HistoriqueMedicalPatient.Patient_HistoryM;
import com.pfe.backend_pfe.Entities.*;
import com.pfe.backend_pfe.reposetory.DossierRepo;
import com.pfe.backend_pfe.reposetory.OrdonnanceRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class His_MedImplTest {

    @Mock
    private DossierRepo dossierRepo;
    @InjectMocks
    private His_MedImpl service;
    @Mock
    private OrdonnanceRepo oR;

    @Test
    void testLogiqueMedecinOrd() {
        Specialite sp = new Specialite();
        sp.setNomspec("Dermatologie");
        Hopital h = new Hopital();
        h.setNom_hopital("CHU Rabat");
        Medecin m = new Medecin();
        m.setPrenom("Karim");
        m.setNom("Ali");
        m.setSpecialite(sp);
        m.setHopital(h);
        Medicament med = new Medicament();
        med.setNom("Doliprane");
        Ordonnance ord = new Ordonnance();
        ord.setIdOrdonnance(1L);
        ord.setMedecin(m);
        ord.setMotif_viste("Acné");
        ord.setDiagnostic("Peau grasse");
        ord.setMedicaments(List.of(med));
        ord.setDateOrdonnance(new Date());
        Dossier d = new Dossier();
        d.setOrdonnances(List.of(ord));
        d.setVaccinations(new ArrayList<>());
        when(dossierRepo.findByPatient_Id(anyLong())).thenReturn(Optional.of(d));
        H_MedicalDto result = service.getHistoriqueMed(1L);
        Patient_HistoryM pHistory = result.getPHistorys().get(0);
        assertEquals("Dr. Karim Ali", pHistory.getMedecin());
        assertEquals("Dermatologie", pHistory.getSpecialite());
        assertEquals("CHU Rabat", pHistory.getNom_hospital());
        assertEquals("Acné", pHistory.getMotif_viste());
        assertEquals("Peau grasse", pHistory.getDiagnostic());
        assertEquals("Doliprane", pHistory.getNomMedicsment());

    }



    @Test
    void testGeneratePdfOrd(){

        Patient p = new Patient();
        p.setNom("Ali");
        p.setPrenom("Test");
        Dossier d = new Dossier();
        d.setPatient(p);
        Specialite sp = new Specialite();
        sp.setNomspec("Cardio");
        Hopital h = new Hopital();
        h.setNom_hopital("CHU Casa");
        Medecin m = new Medecin();
        m.setPrenom("Karim");
        m.setNom("Ali");
        m.setSpecialite(sp);
        m.setHopital(h);
        Medicament med = new Medicament();
        med.setNom("Doliprane");
        Ordonnance o = new Ordonnance();
        o.setDossiers(d);
        o.setMedecin(m);
        o.setMotif_viste("Douleur");
        o.setDiagnostic("Fatigue");
        o.setMedicaments(List.of(med));
        o.setDateOrdonnance(new Date());
        when(oR.findById(anyLong())).thenReturn(Optional.of(o));
        byte[] pdf = service.generatePdfOrdById(1L);
        assertNotNull(pdf);
        assertTrue(pdf.length > 0);
    }
}