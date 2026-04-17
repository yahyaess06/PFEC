package com.pfe.backend_pfe.Entities;

import com.pfe.backend_pfe.Entities.Enumerations.Regions;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Hopital {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_hopital;
    private String nom_hopital;
    private String local;
    private String email;
    @OneToMany(mappedBy = "hopital")
    private Collection<Rendez_Vous> rendez_vous;

    //@OneToMany(mappedBy = "hopital")
     //private Collection<Rendez_Vous> rendezVous;


    //private Collection<Rendez_Vous> rendez_vous;
    @Enumerated(EnumType.STRING)
    private Regions regions;
    @OneToMany(mappedBy = "hopital")
    private List<Personnel> prsls;
    //@OneToMany(mappedBy = "hopital")
    //private Collection<Personnel> personnel;
}