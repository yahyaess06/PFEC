package com.pfe.backend_pfe.Metier.Infermier;

import com.pfe.backend_pfe.DTO.InfirmierRdvDto.VaccinationConsDto;
import com.pfe.backend_pfe.Entities.Vaccination;
import com.pfe.backend_pfe.Exceptions.DossierNotFoundException;

public interface ConsVccMetier {
    Vaccination createVcc(VaccinationConsDto vDto, Long idInf) throws DossierNotFoundException;
}
