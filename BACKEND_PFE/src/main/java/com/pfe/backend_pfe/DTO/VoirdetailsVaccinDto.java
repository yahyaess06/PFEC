package com.pfe.backend_pfe.DTO;

import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoirdetailsVaccinDto {
    private Date date;
    private String period;
    private String description;
    private String nomPatient;
    private String cinPatient;
    private String prenomPatient;
    private Long numeroPatient;
    private String nomHopital;
    private String adresseHopital;
    private String nomInfermier;
    private String prenomInfermier;
    private Staus status;
}
