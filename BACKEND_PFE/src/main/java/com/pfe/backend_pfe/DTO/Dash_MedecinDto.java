package com.pfe.backend_pfe.DTO;

import lombok.Data;

@Data
public class Dash_MedecinDto {
    private Long totalPatients;
    private Long rdvConfirme;
    private Long rdvTermine;
    private Long rdvAnnulee;
    private Long rdvEnAttente;
}
