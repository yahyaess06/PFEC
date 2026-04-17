package com.pfe.backend_pfe.Mappers;

import com.pfe.backend_pfe.DTO.MedecinDto;
import com.pfe.backend_pfe.DTO.MedecinProfileDto;
import com.pfe.backend_pfe.Entities.Medecin;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

//@Component
@Service
public class MedecinMapper {

    public MedecinDto mapToDto(Medecin medecin) {
        MedecinDto medecinDto = new MedecinDto();
       BeanUtils.copyProperties(medecin, medecinDto);
        return medecinDto;
    }


    public MedecinProfileDto medecinToProfileDto(Medecin m) {
        MedecinProfileDto medecinProfileDto = new MedecinProfileDto();
        BeanUtils.copyProperties(m, medecinProfileDto);
        return medecinProfileDto;
    }

    public Medecin dtoToMedecin(MedecinProfileDto medecinProfileDto) {
        Medecin m = new Medecin();
        BeanUtils.copyProperties(medecinProfileDto, m);
        return m;
    }

}
