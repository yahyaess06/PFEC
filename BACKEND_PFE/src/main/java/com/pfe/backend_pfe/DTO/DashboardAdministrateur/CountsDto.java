package com.pfe.backend_pfe.DTO.DashboardAdministrateur;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CountsDto {
    private int totalPatient;
    private int totalDoctor;
    private int consultationsparmois;
    private int rdvEnattend;
    private int rdvLyom;
    private int countInfermiers;
    private int countrdvConfirmer;
    private int countrdvAnnuler;
}
