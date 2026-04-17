package com.pfe.backend_pfe.Metier.Infermier;

import com.pfe.backend_pfe.DTO.InfirmierRdvDto.ProfileInfDto;
import com.pfe.backend_pfe.Exceptions.InfermierIntrouvableException;

public interface ProfileInfMetier {
    ProfileInfDto getProfileInfDto(Long idInf) throws InfermierIntrouvableException;
}
