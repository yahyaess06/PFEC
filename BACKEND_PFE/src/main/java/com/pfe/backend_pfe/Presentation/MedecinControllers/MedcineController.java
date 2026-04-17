package com.pfe.backend_pfe.Presentation.MedecinControllers;

import com.pfe.backend_pfe.DTO.CountDocDto;
import com.pfe.backend_pfe.DTO.MedecinDto;
import com.pfe.backend_pfe.DTO.PageMedcinDto;
import com.pfe.backend_pfe.Entities.Medecin;
import com.pfe.backend_pfe.Entities.Specialite;
import com.pfe.backend_pfe.Metier.MedecinService.MedecinMetier;
import com.pfe.backend_pfe.reposetory.SpecialiteRepo;
import lombok.AllArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/medecins")
@CrossOrigin(origins = "http://localhost:5173")
public class MedcineController {
    private final MedecinMetier medecinMetier;
    private final SpecialiteRepo specRepo;

//    @GetMapping
//    private List<MedecinDto> getMedecins() {
//        return medecinMetier.getAllMedecins();
//    }

    @GetMapping
    private PageMedcinDto getMedecins(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "6") int size) {
        return medecinMetier.getAllMedecins(page, size);
    }
    //@PreAuthorize("hasRole('PATIENT')")
//    @GetMapping("/specialite")
//    public List<MedecinDto> getMedcinBySpec(@RequestParam String spec) {
//        return medecinMetier.getMedcinBySpec(spec);
//    }

    @GetMapping("/specialite")
    public PageMedcinDto getMedcinBySpec(@RequestParam String spec,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        return medecinMetier.getMedcinBySpec(spec, page, size);
    }

    @GetMapping("/specialites")
    public List<String> getAllSpecialites() {
        return specRepo.findAll()
                .stream()
                .map(Specialite::getNomspec)
                .toList();
    }

    @GetMapping("/{id}")
    public MedecinDto getMedecinById(@PathVariable Long id) {
        return medecinMetier.getMedecinById(id);
    }


}
