package com.pfe.backend_pfe.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ordonnance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idOrdonnance;
    //@Temporal(TemporalType.TIMESTAMP) tal mn ba3d
    private Date dateOrdonnance;
    private String description;
    private String motif_viste;
    private String diagnostic;
    @ManyToOne
    private Medecin medecin;
    @ManyToOne
    private Dossier dossiers;
    //@OneToMany(mappedBy = "ordonnance")
    @ManyToMany
    private List<Medicament> medicaments;

}
