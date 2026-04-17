package com.pfe.backend_pfe.Metier.Departement;

import com.pfe.backend_pfe.DTO.AdministrateurRdvs.DepartementNomsDto;
import com.pfe.backend_pfe.DTO.DepartementsDto;
import com.pfe.backend_pfe.DTO.ListDepartementDto;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;
import com.pfe.backend_pfe.Exceptions.SpecialiteNotPresentInDbException;

import java.util.List;

public interface IdepartementService {
    ListDepartementDto voireDataDepartements(Long id,int page,int size) throws PersonnelNotFOundException;

    List<DepartementNomsDto> voireDeps(Long id) throws PersonnelNotFOundException;
}
