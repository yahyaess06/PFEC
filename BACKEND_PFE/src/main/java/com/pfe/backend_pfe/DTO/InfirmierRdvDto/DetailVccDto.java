package com.pfe.backend_pfe.DTO.InfirmierRdvDto;

import com.pfe.backend_pfe.Entities.Enumerations.G_Sanguin;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import lombok.Data;

import java.util.Date;

@Data
public class DetailVccDto {
    private Long rdvId;
    private Long patientId;
    private Long dossierId;
    private String nomPatient;
    private String prenomPatient;
    private String cinPatient;
    private Date date;
    private String period;
    private Long numeroPatient;
    private String description;
    private Staus status;
    private int age;
    private String sexe;
    private G_Sanguin groupeSanguin;
    private String allergies;
    private String traitements;
}
