package com.pfe.backend_pfe.DTO.Administrateur;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdministrateurDTO {
    private Long id;
    private String cin;
    private String nom;
    private String prenom;
    private String mail;
    private String tel;
    private int age;
    private String password;
    private Date datearrive;
}
