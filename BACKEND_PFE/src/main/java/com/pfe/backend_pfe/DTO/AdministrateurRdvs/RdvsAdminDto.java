package com.pfe.backend_pfe.DTO.AdministrateurRdvs;


import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RdvsAdminDto {
    private Date date;
    private String duree;
    private String nom;
    private String prenom;
    private int age;
    private String nomDoc;
    private String prenomDoc;
    private String departement;
    private Long numeroRdv;
    private String description;
    private Staus status;
}
