package com.pfe.backend_pfe.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vaccination {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idVaccin;
    private Date dateVaccin;
    private String motif;
    private String observation;
    //private String dose;
    private String nomVaccin; //t9dar tkon Enum
    @ManyToOne
    private Dossier dossierV;
    @ManyToOne
    private Infermier infermierV;
}
