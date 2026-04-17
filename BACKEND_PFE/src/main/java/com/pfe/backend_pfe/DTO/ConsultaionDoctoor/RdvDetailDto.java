package com.pfe.backend_pfe.DTO.ConsultaionDoctoor;

import lombok.Data;

@Data
public class RdvDetailDto {
    private Long id;
//    private String date;
//    private String motif;
//    private String diagnostic;
//    private String status;

    private PatientDetailDto patient;
}
