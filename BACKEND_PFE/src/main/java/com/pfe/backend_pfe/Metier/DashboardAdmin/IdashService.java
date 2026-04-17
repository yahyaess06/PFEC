package com.pfe.backend_pfe.Metier.DashboardAdmin;

import com.pfe.backend_pfe.DTO.DashboardAdministrateur.CountsDto;
import com.pfe.backend_pfe.DTO.DashboardAdministrateur.PourcentageDto;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;

import java.util.Date;

public interface IdashService {
    public CountsDto getCounts(Long id) throws PersonnelNotFOundException;

    PourcentageDto getPourcentage(Long id, Date date) throws PersonnelNotFOundException;
}
