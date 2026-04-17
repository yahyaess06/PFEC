package com.pfe.backend_pfe.DTO;

import com.pfe.backend_pfe.Entities.Specialite;
import lombok.Data;

import java.util.Date;

@Data
public class CreationDocDto {
    private Long id;
    private String cin;
    private String nom;
    private String prenom;
    private String email;
    private int age;
    private String telephone;
    private String password;
    private Date date_arrivee;
    private String  specialite;
    private String description;
}
