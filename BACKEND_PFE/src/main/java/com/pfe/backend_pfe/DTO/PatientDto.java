package com.pfe.backend_pfe.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDto {
    private Long id;
    private String cin;
    private String nom;
    private String prenom;
    private int age;
    private String email;
    private String telephone;
    private String password;
    private String sexe;
    private String adresse;

}
