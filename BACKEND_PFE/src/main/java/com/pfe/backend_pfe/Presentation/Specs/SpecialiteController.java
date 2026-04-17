package com.pfe.backend_pfe.Presentation.Specs;


import com.pfe.backend_pfe.DTO.SpecialiteDto;
import com.pfe.backend_pfe.Exceptions.SpecNullException;
import com.pfe.backend_pfe.Metier.Specialite.ISpecService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class SpecialiteController {
private final ISpecService sp;

    @GetMapping("/allSpecs")
    public List<SpecialiteDto> getSpecialites() throws SpecNullException {
        return sp.getSpecialite();
    }
}
