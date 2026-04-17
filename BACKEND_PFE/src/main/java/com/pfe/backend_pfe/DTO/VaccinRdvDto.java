package com.pfe.backend_pfe.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VaccinRdvDto {
    private Long patientId;
    private Date date;
    private String period;
    private String description;
    private Long hopitalId;
}
