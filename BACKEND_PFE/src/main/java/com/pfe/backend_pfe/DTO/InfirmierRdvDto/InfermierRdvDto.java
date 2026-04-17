package com.pfe.backend_pfe.DTO.InfirmierRdvDto;

import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import lombok.Data;

import java.util.Date;

@Data
public class InfermierRdvDto {
    private Long id;
    private String nomPatient;
    private String prenomPatient;
    private String cinPatient;
    private Date date;
    private String periode;
    private Long numero;
    private String description;
    private Staus status;
}
