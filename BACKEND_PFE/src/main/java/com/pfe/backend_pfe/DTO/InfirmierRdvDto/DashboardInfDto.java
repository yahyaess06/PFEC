package com.pfe.backend_pfe.DTO.InfirmierRdvDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardInfDto {
    private long totalPatients;
    private long confirme;
    private long enAttente;
    private long termine;
    private long annule;
}
