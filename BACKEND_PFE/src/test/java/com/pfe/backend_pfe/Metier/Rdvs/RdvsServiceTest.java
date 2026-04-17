package com.pfe.backend_pfe.Metier.Rdvs;

import com.pfe.backend_pfe.DTO.Prenrdvdto;
import com.pfe.backend_pfe.Entities.Hopital;
import com.pfe.backend_pfe.Entities.Medecin;
import com.pfe.backend_pfe.Entities.Patient;
import com.pfe.backend_pfe.Entities.Rendez_Vous;
import com.pfe.backend_pfe.Exceptions.*;
import com.pfe.backend_pfe.reposetory.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
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
@DisplayName("class pour tester le cas de simple rdv")
class RdvsServiceTest {

    @Mock
    private RendezVousRepo rdvr;
    @Mock
    private PatientRepo patientRepo;
    @Mock
    private MedcineRepo mr;
    @Mock
    private Hopitalrepo hr;
    @InjectMocks
    private RdvsService rdvsService;

    private Prenrdvdto rdvDto;

    @Test
    void rdv_DejaPasser(){
        rdvDto = new Prenrdvdto();
        rdvDto.setDate(new Date(System.currentTimeMillis() - 86400000));
        assertThrows(DateDejaPasseException.class,()->{
           rdvsService.prendreRdv(rdvDto);
        });
    }

    @Test
    void rdv_Dupliquer(){
        rdvDto = new Prenrdvdto();
        rdvDto.setDate(new Date(System.currentTimeMillis() + 86400000));
        rdvDto.setPatientId(1L);
        rdvDto.setSpecialite("Dermatologie");
        when(rdvr.existsRendezVousAfterDateAndSpecialite(
                anyLong(),
                any(Date.class),
                anyString()))
                .thenReturn(1);
        assertThrows(RdvDupliquerException.class,()->{
            rdvsService.prendreRdv(rdvDto);
                }
        );
    }

    @Test
    void MedecinNotFoundRdv(){
        rdvDto = new Prenrdvdto();
        rdvDto.setDate(new Date(System.currentTimeMillis() + 86400000));
        rdvDto.setPatientId(1L);
        rdvDto.setIdHopital(1L);
        rdvDto.setSpecialite("Dermatologie");
        when(rdvr.existsRendezVousAfterDateAndSpecialite(anyLong(),any(Date.class),anyString()))
                .thenReturn(0);
        when(hr.findById(anyLong())).thenReturn(Optional.of(new Hopital()));
        when(mr.findBySpecialite(anyString(),anyLong())).thenReturn(List.of());
        assertThrows(MedcinNotFoundException.class,()->{
            rdvsService.prendreRdv(rdvDto);
        });
    }

    @Test
    void medecinLimiteRdv(){
        Prenrdvdto dto = new Prenrdvdto();
        dto.setDate(new Date(System.currentTimeMillis()+86400000));
        dto.setPatientId(1L);
        dto.setIdHopital(1L);
        dto.setSpecialite("Dermatologie");
        dto.setPeriode("matin");

        Hopital h = new Hopital();
        Patient p = new Patient();
        p.setId(1L);
        h.setId_hopital(1L);
        Medecin m = new Medecin();
        m.setId(1L);
        when(rdvr.existsRendezVousAfterDateAndSpecialite(anyLong(),any(Date.class),anyString()))
                .thenReturn(0);
        when(hr.findById(anyLong()))
                .thenReturn(Optional.of(h));
        when(mr.findBySpecialite(anyString(),anyLong())).thenReturn(new ArrayList<>(List.of(m)));
        when(rdvr.FindNumberRendezVousByMedecinId(anyLong(), any(Date.class), anyString(), any()))
                .thenReturn(30L);
//        when(patientRepo.findById(anyLong())).thenReturn(Optional.of(p));
        assertThrows(HopitalFullException.class, () -> {
            rdvsService.prendreRdv(dto);
        });
    }

    @Test
    void rdvMedcinMoinsCharge() throws PatientNotfoundException, RdvDupliquerException, HoptialNotfoundException, MedcinNotFoundException, DossierNotFoundException, HopitalFullException, DateDejaPasseException {
        rdvDto = new Prenrdvdto();
        rdvDto.setDate(new Date(System.currentTimeMillis() + 86400000));
        rdvDto.setPatientId(1L);
        rdvDto.setIdHopital(1L);
        rdvDto.setSpecialite("Dermatologie");
        rdvDto.setPeriode("matin");

        Hopital h = new Hopital();
        Patient p = new Patient();
        Medecin m1 = new Medecin();
        Medecin m2 = new Medecin();
        p.setId(1L);
        h.setId_hopital(1L);
        m1.setId(1L);
        m2.setId(2L);

        when(rdvr.existsRendezVousAfterDateAndSpecialite(anyLong(), any(Date.class), anyString())).thenReturn(0);
        when(hr.findById(anyLong())).thenReturn(Optional.of(h));
        when(mr.findBySpecialite(anyString(), anyLong())).thenReturn(new ArrayList<>(List.of(m1, m2)));
        when(patientRepo.findById(anyLong())).thenReturn(Optional.of(p));
        when(rdvr.FindNumberRendezVousByMedecinId(eq(1L), any(Date.class), anyString(), any())).thenReturn(2L);
        when(rdvr.FindNumberRendezVousByMedecinId(eq(2L), any(Date.class), anyString(), any())).thenReturn(0L);
        rdvsService.prendreRdv(rdvDto);
        verify(rdvr).save(argThat(rdv ->
                rdv.getMedecin() != null &&
                        rdv.getMedecin().getId().equals(2L)
        ));

    }

    @Test
    void prendreRdv() throws RdvDupliquerException, HoptialNotfoundException, MedcinNotFoundException, HopitalFullException, DateDejaPasseException, PatientNotfoundException, DossierNotFoundException {
        rdvDto = new Prenrdvdto();
        rdvDto.setDate(new Date(System.currentTimeMillis() + 86400000));
        rdvDto.setPatientId(1L);
        rdvDto.setIdHopital(1L);
        rdvDto.setSpecialite("Dermatologie");
        rdvDto.setPeriode("matin");

        Hopital h = new Hopital();
        h.setId_hopital(1L);

        Medecin m = new Medecin();
        m.setId(1L);

        Patient p = new Patient();
        p.setId(1L);

        when(rdvr.existsRendezVousAfterDateAndSpecialite(anyLong(),any(Date.class),anyString())).thenReturn(0);
        when(hr.findById(anyLong())).thenReturn(Optional.of(h));
        when(mr.findBySpecialite(anyString(),anyLong())).thenReturn(List.of(m));
        when(rdvr.FindNumberRendezVousByMedecinId(anyLong(), any(Date.class), anyString(),any())).thenReturn(1L);
        when(patientRepo.findById(anyLong())).thenReturn(Optional.of(p));
        rdvsService.prendreRdv(rdvDto);
        verify(rdvr, times(1)).save(any(Rendez_Vous.class));

    }
}