package com.pfe.backend_pfe.DTO.ConsultaionDoctoor;

import lombok.Data;

@Data
public class PatientDetailDto {
    private Long id;
    private String nom;
    private String prenom;
    private String sexe;
    private int age;
}
