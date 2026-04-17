package com.pfe.backend_pfe.Mappers;

import com.pfe.backend_pfe.DTO.RdvsDto;
import com.pfe.backend_pfe.DTO.VrdvDto;
import com.pfe.backend_pfe.Entities.Rendez_Vous;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class RdvsMappers {

    public RdvsDto rdvsTodto(Rendez_Vous rv) {
        RdvsDto rdvsDto = new RdvsDto();
        BeanUtils.copyProperties(rv,rdvsDto);
        return rdvsDto;
    }

    public VrdvDto rdvsTovdto(Rendez_Vous rv) {
        VrdvDto rdvDto = new VrdvDto();
        BeanUtils.copyProperties(rv,rdvDto);
        return rdvDto;
    }
}
