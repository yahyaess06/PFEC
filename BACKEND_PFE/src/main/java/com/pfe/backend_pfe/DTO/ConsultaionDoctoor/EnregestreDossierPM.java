package com.pfe.backend_pfe.DTO.ConsultaionDoctoor;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class EnregestreDossierPM {
    private String motif;
    private String diagnostic;
    private Date dateOrd;
    private List<Long> medicaments;
    //private String description;

    //symptomes
    //Prescription & Traitement
    //Examen clinique

}
