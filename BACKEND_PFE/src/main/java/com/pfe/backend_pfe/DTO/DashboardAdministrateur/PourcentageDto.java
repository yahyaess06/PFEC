package com.pfe.backend_pfe.DTO.DashboardAdministrateur;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PourcentageDto {
    private int pourcentageCardio;
    private int pourcentageDer;
    private int pourcentageNeu;
    private int pourcentageGyne;
    private int pourcentageGenerale;
}
