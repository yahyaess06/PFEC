package com.pfe.backend_pfe.DTO.RV_EnseintDto;

import com.pfe.backend_pfe.Entities.Medecin;
import com.pfe.backend_pfe.Entities.Specialite;
import lombok.Data;

import java.util.Date;

@Data
public class EnseintDto {
    private Long patientId;
    private Date date;
    private Long hopitalId;
    private String periode;
    private int nbMoins;
//    private Boolean question;
    private String description;
}
