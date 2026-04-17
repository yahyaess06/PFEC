package com.pfe.backend_pfe.DTO;


import com.pfe.backend_pfe.Entities.Specialite;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Prenrdvdto {
    private Date date;
    private String specialite;
    private String periode;
    private String desciption;
    private Long idHopital;
    private Long patientId;
}
