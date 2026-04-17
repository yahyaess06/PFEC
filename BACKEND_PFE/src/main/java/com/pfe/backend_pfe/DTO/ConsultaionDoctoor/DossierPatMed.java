package com.pfe.backend_pfe.DTO.ConsultaionDoctoor;

import com.pfe.backend_pfe.Entities.Enumerations.G_Sanguin;
import lombok.Data;

@Data
public class DossierPatMed {
    private Long id;
    private G_Sanguin sanguin;
    private String allerges_notees;
    private String t_actuel;
}
