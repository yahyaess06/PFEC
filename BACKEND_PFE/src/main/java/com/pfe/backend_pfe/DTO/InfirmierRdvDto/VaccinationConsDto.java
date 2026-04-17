package com.pfe.backend_pfe.DTO.InfirmierRdvDto;

import lombok.Data;

@Data
public class VaccinationConsDto {
    private Long dossierId;
    private String nomVaccin;
    private String motif;
    private String observation;
}
