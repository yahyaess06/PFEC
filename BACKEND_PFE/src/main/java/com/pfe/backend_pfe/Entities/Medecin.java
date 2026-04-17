package com.pfe.backend_pfe.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.List;


@Entity
@Table(name = "medecin")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@PrimaryKeyJoinColumn(name = "personnel_id")
public class Medecin extends Personnel {
    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    //private Long id_medecin;
    @ManyToOne
    private Specialite specialite;
    private String description;
    @OneToMany(mappedBy = "medecin")
    private Collection<Ordonnance> ordonnances;
    @ManyToOne
    private Dossier dossier;
    @OneToMany(mappedBy = "medecin")
    private List<Rendez_Vous> rds;

}
