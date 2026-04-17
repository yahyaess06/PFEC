package com.pfe.backend_pfe.Entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;


@Entity
@Table(name = "patient")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@PrimaryKeyJoinColumn(name = "user_id") // ghir bach n specifiew le nom dyal column
public class Patient extends User {
    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    //private Long id_patient; lah9ach Inhertance type joined
    private String sexe;
    private String adresse;
    private boolean verified;
    //@ManyToMany
    //private Collection<Service> service;
    @OneToMany(mappedBy = "patient")
    private List<Rendez_Vous> rdvs;
    @OneToOne(mappedBy = "patient")
    private Dossier dossier;
    //@OneToMany(mappedBy = "patient")
    //private Collection<Rendez_Vous> rendez_vous;

}
