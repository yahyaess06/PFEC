package com.pfe.backend_pfe.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Maladie {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String nom_maladie;
    private String type_maladie;
    private String description;
    @ManyToOne
    private Dossier dossier;
}
