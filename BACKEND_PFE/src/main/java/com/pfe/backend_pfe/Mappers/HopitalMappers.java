package com.pfe.backend_pfe.Mappers;

import com.pfe.backend_pfe.DTO.HopitalDto;
import com.pfe.backend_pfe.Entities.Hopital;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;


@Service
public class HopitalMappers {
    public HopitalDto hoptodto(Hopital hopital) {
        HopitalDto dto = new HopitalDto();
        BeanUtils.copyProperties(hopital, dto);
        return dto;
    }
}
