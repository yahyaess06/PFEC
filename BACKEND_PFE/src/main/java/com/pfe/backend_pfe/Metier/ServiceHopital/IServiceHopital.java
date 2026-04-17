package com.pfe.backend_pfe.Metier.ServiceHopital;

import com.pfe.backend_pfe.DTO.HopitalDto;
import com.pfe.backend_pfe.Entities.Enumerations.Regions;

import java.util.List;

public interface IServiceHopital {
   

    List<HopitalDto> afficherHoptiaux(Regions rgs);
}
