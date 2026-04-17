package com.pfe.backend_pfe.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class Dash_PatientDto {
    private long rdvAVenir;
    //private long rdvEnAttente;
    private long rdvTermines;
    //private long docteursSuivis;

    private ProchainRdv prochainRdv;
    @Data
    public static class ProchainRdv {
        private Date date;
        private String nomMedecin;
        private String nomInfermier;
        private String specialite;
        private String periode;
        private Long nbrRdv;
    }

}
