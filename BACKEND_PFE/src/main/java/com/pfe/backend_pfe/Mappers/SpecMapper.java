package com.pfe.backend_pfe.Mappers;

import com.pfe.backend_pfe.DTO.MedecinDto;
import com.pfe.backend_pfe.DTO.SpecialiteDto;
import com.pfe.backend_pfe.Entities.Specialite;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class SpecMapper {
    public SpecialiteDto SpectoSpecDto(Specialite spec){
        SpecialiteDto specialiteDto = new SpecialiteDto();
        BeanUtils.copyProperties(spec, specialiteDto);
        return specialiteDto;
    }
}
