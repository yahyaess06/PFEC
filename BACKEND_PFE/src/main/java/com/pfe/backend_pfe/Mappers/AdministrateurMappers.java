package com.pfe.backend_pfe.Mappers;

import com.pfe.backend_pfe.DTO.Administrateur.AdministrateurDTO;
import com.pfe.backend_pfe.Entities.Personnel;
import org.springframework.stereotype.Service;

@Service
public class AdministrateurMappers {
    public AdministrateurDTO mapToDto(Personnel admin) {
        AdministrateurDTO dto = new AdministrateurDTO();
        dto.setId(admin.getId());
        dto.setCin(admin.getCin());
        dto.setNom(admin.getNom());
        dto.setPrenom(admin.getPrenom());
        dto.setMail(admin.getEmail());
        dto.setTel(admin.getTelephone());
        dto.setAge(admin.getAge());
      //  dto.setPassword(admin.getPassword());
        dto.setDatearrive(admin.getDate_arrivee());
        return dto;
    }
}
