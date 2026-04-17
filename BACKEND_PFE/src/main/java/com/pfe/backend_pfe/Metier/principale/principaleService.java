package com.pfe.backend_pfe.Metier.principale;

import com.pfe.backend_pfe.DTO.PrincipaleDto;
import com.pfe.backend_pfe.Entities.Enumerations.Regions;
import com.pfe.backend_pfe.reposetory.Hopitalrepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class principaleService implements IprincipaleService{
   private final Hopitalrepo hr;

    @Override
    public List<PrincipaleDto> voireDonneePrincipale() {

        List<PrincipaleDto> listDto=new ArrayList<>();
        for(Regions region : Regions.values()){
            PrincipaleDto principaleDto = new PrincipaleDto();
            List<String> hopnames=hr.findnomaleatoireByRegion(region);
           principaleDto.setCounthospital(hr.findHopByRegion(region));
           principaleDto.setNomHospital(hopnames.get(0));
           principaleDto.setNomRegion(region);
            listDto.add(principaleDto);
        }
        return listDto;
    }
}
