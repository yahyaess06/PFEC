package com.pfe.backend_pfe.DTO;

import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RdvsMedcinDto {
    private Long rdvId;
    private String nomPatient;
    private String prenomPatient;
    private String duree;
    private Long numRdv;
    private String description;
    //hado ana li zathom
    private String cin;
    private int nbMoins;
    private Boolean priority;
    private String specialite;
    //----
    private Staus status;
    //private String cin;
}
