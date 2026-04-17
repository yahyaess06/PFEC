package com.pfe.backend_pfe.Metier.ServiceHopital;

import com.pfe.backend_pfe.DTO.HopitalDto;
import com.pfe.backend_pfe.Entities.Enumerations.Regions;
import com.pfe.backend_pfe.Entities.Hopital;
import com.pfe.backend_pfe.Mappers.HopitalMappers;
import com.pfe.backend_pfe.reposetory.Hopitalrepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class ServiceHopital implements IServiceHopital{

    private Hopitalrepo hp;
    private HopitalMappers hm;

    @Override
    public List<HopitalDto> afficherHoptiaux(Regions rgs) {
        List<Hopital> hs= hp.findHopitalByRegions(rgs);
        return hs.stream().
                map(hopital->hm.hoptodto(hopital))
                .toList();
    }
}
