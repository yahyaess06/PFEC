package com.pfe.backend_pfe.Metier.RvEnseint;

import com.pfe.backend_pfe.DTO.RV_EnseintDto.EnseintDto;
import com.pfe.backend_pfe.Entities.*;
import com.pfe.backend_pfe.Exceptions.*;
import com.pfe.backend_pfe.reposetory.*;
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
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RV_EnseintImplTest {

    @Mock
    private RendezVousRepo rv;
    @Mock
    private PatientRepo pR;
    @Mock
    private MedcineRepo mR;
    @Mock
    private Hopitalrepo hR;
    @Mock
    private DossierRepo dR;

    @InjectMocks
    private RV_EnseintImpl service;

    private EnseintDto enseintDto;

    @Test
    void RdvDateAujourdHuiInvalide(){
        enseintDto = new EnseintDto();
//        enseintDto.setDate(new Date(System.currentTimeMillis() - 86400000)); //lbarh
        enseintDto.setDate(new Date());
        assertThrows(HospitalNotFound.class, () -> {
            service.saveRvEnseint(enseintDto);
        });
    }

    @Test
    void RdvEnsDuplique(){
        enseintDto = new EnseintDto();
        enseintDto.setDate(new Date(System.currentTimeMillis()+86400000));
        enseintDto.setPatientId(1L);

        Patient p = new Patient();
        p.setId(1L);
        when(pR.findById(1L)).thenReturn(Optional.of(p));
        when(rv.countByPatientAndDate(anyLong(), any(Date.class)))
                .thenReturn(1L);
        assertThrows(HospitalNotFound.class, () -> {
            service.saveRvEnseint(enseintDto);
        });
    }

    @Test
    void gynecologieIntrovable(){
        enseintDto = new EnseintDto();
        enseintDto.setDate(new Date(System.currentTimeMillis()+86400000));
        enseintDto.setPatientId(1L);
        enseintDto.setHopitalId(1L);

        Patient p = new Patient();
        p.setId(1L);
        Hopital h = new Hopital();
        h.setId_hopital(1L);

        when(pR.findById(1L)).thenReturn(Optional.of(p));
        when(rv.countByPatientAndDate(anyLong(), any(Date.class))).thenReturn(0L);
        when(hR.findById(1L)).thenReturn(Optional.of(h));
        when(mR.findGynecologuesByHopital(anyLong())).thenReturn(List.of());
        assertThrows(GynecologeNotFound.class, () -> {service.saveRvEnseint(enseintDto);});

    }

    @Test
    void prioriteRdvEnseintLimite(){
        enseintDto = new EnseintDto();
        enseintDto.setDate(new Date(System.currentTimeMillis()+86400000));
        enseintDto.setPatientId(1L);
        enseintDto.setHopitalId(1L);
        enseintDto.setNbMoins(8);

        Patient p = new Patient();
        p.setId(1L);
        Hopital h = new Hopital();
        h.setId_hopital(1L);
        Medecin m = new Medecin();
        m.setId(1L);

        when(pR.findById(anyLong())).thenReturn(Optional.of(p));
        when(rv.countByPatientAndDate(anyLong(), any(Date.class))).thenReturn(0L);
        when(hR.findById(anyLong())).thenReturn(Optional.of(h));
        when(mR.findGynecologuesByHopital(anyLong())).thenReturn(new ArrayList<>(List.of(m)));
        when(rv.countUrgentByMedecinAndDate(anyLong(), any(Date.class))).thenReturn(8L);
        assertThrows(HospitalNotFound.class, () -> {
            service.saveRvEnseint(enseintDto);
        });
    }

    @Test
    void simpleLimitesRdv(){
        enseintDto = new EnseintDto();
        enseintDto.setDate(new Date(System.currentTimeMillis()+86400000));
        enseintDto.setPatientId(1L);
        enseintDto.setHopitalId(1L);
        enseintDto.setNbMoins(5);
        enseintDto.setPeriode("matin");

        Patient p = new Patient();
        p.setId(1L);
        Hopital h = new Hopital();
        h.setId_hopital(1L);
        Medecin m = new Medecin();
        m.setId(1L);

        when(pR.findById(anyLong())).thenReturn(Optional.of(p));
        when(rv.countByPatientAndDate(anyLong(), any(Date.class))).thenReturn(0L);
        when(hR.findById(anyLong())).thenReturn(Optional.of(h));
        when(mR.findGynecologuesByHopital(anyLong())).thenReturn(new ArrayList<>(List.of(m)));
        when(rv.FindNumberRendezVousByMedecinId(anyLong(), any(), anyString(), any()))
                .thenReturn(2L);
        assertThrows(HospitalNotFound.class, () -> {
            service.saveRvEnseint(enseintDto);
        });
    }

    @Test
    void rdvMedecinMoinsCharge() throws Exception, HoptialNotfoundException {
        enseintDto = new EnseintDto();
        enseintDto.setDate(new Date(System.currentTimeMillis() + 86400000));
        enseintDto.setPatientId(1L);
        enseintDto.setHopitalId(1L);
        enseintDto.setNbMoins(5);
        enseintDto.setPeriode("matin");

        Patient p = new Patient();
        p.setId(1L);
        Hopital h = new Hopital();
        h.setId_hopital(1L);
        Medecin m1 = new Medecin();
        m1.setId(1L);
        Medecin m2 = new Medecin();
        m2.setId(2L);
        Dossier d = new Dossier();

        when(pR.findById(anyLong())).thenReturn(Optional.of(p));
        when(rv.countByPatientAndDate(anyLong(), any(Date.class))).thenReturn(0L);
        when(hR.findById(anyLong())).thenReturn(Optional.of(h));
        when(mR.findGynecologuesByHopital(anyLong())).thenReturn(new ArrayList<>(List.of(m1, m2)));
        when(rv.FindNumberRendezVousByMedecinId(eq(1L), any(Date.class), anyString(), any())).thenReturn(2L);
        when(rv.FindNumberRendezVousByMedecinId(eq(2L), any(Date.class), anyString(), any())).thenReturn(0L);
        when(dR.findByPatient_Id(anyLong())).thenReturn(Optional.of(d));
        service.saveRvEnseint(enseintDto);
        verify(rv).save(argThat(rdv ->
                rdv.getMedecin() != null &&
                        rdv.getMedecin().getId().equals(2L) &&
                        rdv.getNumrdv().equals(1L)
        ));
    }

    @Test
    void saveRvEnseint() throws PatientNotfoundException, HospitalNotFound, HoptialNotfoundException, DossierNotFoundException, GynecologeNotFound {
        enseintDto = new EnseintDto();
        enseintDto.setDate(new Date(System.currentTimeMillis()+86400000));
        enseintDto.setPatientId(1L);
        enseintDto.setHopitalId(1L);
        enseintDto.setNbMoins(5);
        enseintDto.setPeriode("matin");

        Patient p = new Patient();
        p.setId(1L);

        Hopital h = new Hopital();
        h.setId_hopital(1L);

        Medecin m = new Medecin();
        m.setId(1L);

        Dossier d = new Dossier();

        when(pR.findById(anyLong())).thenReturn(Optional.of(p));
        when(rv.countByPatientAndDate(anyLong(), any(Date.class))).thenReturn(0L);
        when(hR.findById(anyLong())).thenReturn(Optional.of(h));
        when(mR.findGynecologuesByHopital(anyLong())).thenReturn(List.of(m));
        when(rv.FindNumberRendezVousByMedecinId(anyLong(), any(Date.class), anyString(), any()))
                .thenReturn(0L);
        when(dR.findByPatient_Id(anyLong())).thenReturn(Optional.of(d));

        service.saveRvEnseint(enseintDto);

        verify(rv, times(1)).save(any(Rendez_Vous.class));
    }
}