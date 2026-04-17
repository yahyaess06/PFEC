package com.pfe.backend_pfe.Entities;

import com.pfe.backend_pfe.Entities.Enumerations.G_Sanguin;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dossier {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_dossier;
    private String status_p;
    //private String groupe_sanguin;
    private String allergies_notees;
    private  String traitements_actuels;
    @OneToMany(mappedBy = "dossier")
    private Collection<Medecin> medecins;
    @OneToMany(mappedBy = "dossiers")
    private Collection<Ordonnance> ordonnances;
    @OneToMany(mappedBy = "dossieR")
    private Collection<Rendez_Vous> rendezVous;
    @OneToOne
    private Patient patient;
    @OneToMany(mappedBy = "dossierI")
    private Collection<Infermier> infermier;
    @OneToMany
    private Collection<Maladie> maladies;
    @Enumerated(EnumType.STRING)
    private G_Sanguin g_sanguin;

    //zadt
    @OneToMany(mappedBy = "dossierV")
//    @OrderBy("idVaccin DESC")//---
    private List<Vaccination> vaccinations;
}
