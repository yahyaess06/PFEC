package com.pfe.backend_pfe.Presentation.Status;


import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import com.pfe.backend_pfe.Metier.Status.IStausService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class stausController {

    private final IStausService is;

    @GetMapping("/stausadmin")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public List<Staus> voireStaus(){
        return is.getAllStaus();
    }

}
