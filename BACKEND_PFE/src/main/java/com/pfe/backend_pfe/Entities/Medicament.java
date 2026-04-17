package com.pfe.backend_pfe.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Medicament {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idMedicament;
    private String nom;
//    private int quantite;
//    private Date date_Stock;
//    private Date date_experation;
    private String description;
    //@ManyToOne
    @ManyToMany(mappedBy = "medicaments")
    private List<Ordonnance> ordonnance;

}