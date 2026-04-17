package com.pfe.backend_pfe.Entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Builder
@Entity
@Table(name = "infermier")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "personnel_id")
public class Infermier extends Personnel {
    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    //private Long id_infermier;
    private String specialite;
    private String description;
    @ManyToOne
    private Dossier dossierI;
    @OneToMany(mappedBy = "infermier")
    private List<Rendez_Vous> rds;

    //zadt
    @OneToMany(mappedBy = "infermierV")
    private List<Vaccination> vaccinations;

}
