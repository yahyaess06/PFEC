package com.pfe.backend_pfe.DTO.HistoriqueMedicalPatient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient_HistoryM {
    private Long idOrd;// hada ana li zadto 3la wdit l installation dyal historique M by id ORD
    private Date date;
    private String medecin;
    private String specialite;
    private String motif_viste;
    private String diagnostic;
    private String nom_hospital;
    private String nomMedicsment;
    private String rapport; //t9ad tkon url ola null
}
