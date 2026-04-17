package com.pfe.backend_pfe.DTO;

import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoireRdvDto {

    private Date date;
    private String period;
    private String description;
    private String nomPatient;
    private String cinPatient;
    private String prenomPatient;
    private Long numeroPatient;
    private String nomHopital;
    private String adresseHopital;
    private String nomDoc;
    private String prenomDoc;
    private Staus status;
    private int nbMoins;
}
