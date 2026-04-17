package com.pfe.backend_pfe.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InfermierVoirDto {
    private Long id;
    private String nom;
    private String prenom;
    private String spec;
    private String email;
    private String tele;
    private String cin;
}
