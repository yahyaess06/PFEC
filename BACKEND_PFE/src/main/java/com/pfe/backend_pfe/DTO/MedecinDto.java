package com.pfe.backend_pfe.DTO;

import com.pfe.backend_pfe.Entities.Specialite;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedecinDto {
    private Long id;
    private String nom;
    private String prenom;
    private String nomspec;
    //private String adresse;
    private String telephone;
    private String email;
    private int age;
    //private String rate; hadi hta nchofo liha blanha (reviews)
    private String description;
    private String nomHospital;
}
