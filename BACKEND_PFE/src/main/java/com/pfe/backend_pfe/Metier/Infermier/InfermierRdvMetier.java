package com.pfe.backend_pfe.Metier.Infermier;

import com.pfe.backend_pfe.DTO.CountDto;
import com.pfe.backend_pfe.DTO.InfirmierRdvDto.DetailVccDto;
import com.pfe.backend_pfe.DTO.InfirmierRdvDto.InfermierRdvDto;
import com.pfe.backend_pfe.Exceptions.RdvNontrouvableException;

import java.util.List;

public interface InfermierRdvMetier {
    List<InfermierRdvDto> getInfermierRdvs(Long idInf);
    CountDto getStatsInfermier(Long idInf);
    void confermerRdv(Long idRdv, Long idInf) throws RdvNontrouvableException;
    void annullerRdv(Long idRdv, Long idInf) throws RdvNontrouvableException;
    DetailVccDto getRdvVcc(Long id, Long idInf) throws RdvNontrouvableException;
}
