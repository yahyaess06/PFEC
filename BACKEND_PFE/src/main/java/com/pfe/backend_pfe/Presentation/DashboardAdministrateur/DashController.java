package com.pfe.backend_pfe.Presentation.DashboardAdministrateur;

import com.pfe.backend_pfe.DTO.DashboardAdministrateur.CountsDto;
import com.pfe.backend_pfe.DTO.DashboardAdministrateur.PourcentageDto;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;
import com.pfe.backend_pfe.Metier.DashboardAdmin.IdashService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@AllArgsConstructor
public class DashController {
    private final IdashService ids;

    @GetMapping("/admin/dash/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public CountsDto getCounts(@PathVariable Long id) throws PersonnelNotFOundException {
      return  ids.getCounts(id);
    }
    @GetMapping("/pourcentage/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR')")
    public PourcentageDto getPourcentage(@PathVariable Long id,
      @RequestParam(name = "date",required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) throws PersonnelNotFOundException {
    return ids.getPourcentage(id, date);
    }
}
