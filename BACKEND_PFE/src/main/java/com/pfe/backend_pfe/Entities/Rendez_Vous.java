package com.pfe.backend_pfe.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Rendez_Vous {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date date_rendez_vous;
    private int heurerendezvous;
    private Date minute_rendez_vous;
    private String dureerendezvous;
    private String description;
    private Long numrdv;
    // momkin tra lih modification
    private String motif_viste;
    private String diagnostic;
    private boolean priority;
    @ManyToOne
    private Hopital hopital;
    @ManyToOne
    private Dossier dossieR;
    @Enumerated(EnumType.STRING)
    private Staus staus;
    @ManyToOne
    private Medecin medecin;
    //@JsonIgnore
    @ManyToOne
    private Patient patient;
    //anzid hadchi 3la hasab enseint
    private int nbMoins; // hadi dyal chhal mn chhar g=3andha ao hya hamla , momkin tbadal
//    private Boolean question;

    @ManyToOne
    private Infermier infermier;


}
