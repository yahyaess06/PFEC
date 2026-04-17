package com.pfe.backend_pfe.DTO.InfirmierRdvDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileInfDto {
    private String cin;
    private String prenom;
    private String nom;
    private String specialite;
    private int age;
    private String telephone;
    private String email;
   // private String sexe; kayn wahd lprooblem hna hta nchofoh
    //private String adresse;
}
