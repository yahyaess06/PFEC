package com.pfe.backend_pfe.Metier.Rdvs;

import com.pfe.backend_pfe.DTO.*;
import com.pfe.backend_pfe.DTO.AdministrateurRdvs.PagerDto;
import com.pfe.backend_pfe.DTO.AdministrateurRdvs.Pagerr;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.Exceptions.*;
import com.pfe.backend_pfe.Exceptions.RdvNontrouvableException;

import java.util.Date;
import java.util.List;

public interface IRdvsService {


    List<RdvsDto> getRdvs(Long id);

    void actionAnnule(Long id) throws RdvNontrouvableException;

    void actionConfirmer(Long id) throws RdvNontrouvableException;

    List<RdvsMedcinDto> voireRdvsMedcin(Long id);

    CountDto voireRdvTotal(Long id);

    void prendreRdv(Prenrdvdto prdv) throws HoptialNotfoundException, HopitalFullException, MedcinNotFoundException, PatientNotfoundException, DossierNotFoundException, DateDejaPasseException, RdvDupliquerException;

    VoireRdvDto voireRdv(Long id) throws RdvNontrouvableException;
    public List<VrdvDto> getVaccinRdv(Long id);



    void vacinRdv(VaccinRdvDto vdto) throws HoptialNotfoundException, InfermierIntrouvableException, HopitalFullException, DossierNotFoundException, PatientNotfoundException, DateDejaPasseException, RdvDupliquerException;

    VoirdetailsVaccinDto voirdetailsVaccinDto(Long id) throws RdvNontrouvableException;

    PagerDto voireRdvsParjour(Long id,Date date, String departement, Staus s,int page,int size) throws PersonnelNotFOundException, RdvsJourException;

    Pagerr voireRdvsParjourInf(Long id, Date date, int page, int size, Staus s) throws PersonnelNotFOundException, RdvsJourException;

    NombreDto voireNbDtoNotification(Long id) throws RdvsJourException;
}
