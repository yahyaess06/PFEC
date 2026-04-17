package com.pfe.backend_pfe.DTO;

import com.pfe.backend_pfe.Entities.Infermier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreationInfDto {
    private Long id;
    private String nom;
    private int age;
    private String prenom;
    private String specialite;
    private String cin;
    private String mail;
    private String tel;
    private Date dateArrivee;
    private String description;
    private String password;
}
