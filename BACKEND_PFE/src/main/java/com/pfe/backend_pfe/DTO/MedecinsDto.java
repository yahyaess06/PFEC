package com.pfe.backend_pfe.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedecinsDto {
    private Long id;
    private String nom;
    private String prenom;
    private String specialite;
    private String email;
    private String telephone;
    private String cin;
}
