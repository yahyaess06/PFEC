package com.pfe.backend_pfe.Metier.MedecinService;

//import com.pfe.backend_pfe.Entities.Medecin;

import com.pfe.backend_pfe.DTO.MedecinDto;
import com.pfe.backend_pfe.DTO.PageMedcinDto;

import java.util.List;

public interface MedecinMetier {
//    List<MedecinDto> getAllMedecins();
    PageMedcinDto getAllMedecins(int page, int size);
//    List<MedecinDto> getMedcinBySpec(String spec);
    PageMedcinDto getMedcinBySpec(String spec, int page, int size);
    MedecinDto getMedecinById(Long id);
}
