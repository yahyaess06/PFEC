package com.pfe.backend_pfe.DTO;

import com.pfe.backend_pfe.Entities.Enumerations.Regions;
import lombok.Data;

@Data
public class PrincipaleDto {
    private int counthospital;
    private String nomHospital;
    private Regions nomRegion;
}
