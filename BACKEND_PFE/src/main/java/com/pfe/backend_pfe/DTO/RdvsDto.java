package com.pfe.backend_pfe.DTO;

import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RdvsDto {

    private Long id;
    private Date date_rendez_vous;
private Staus staus;
    private String description;
    private String Nomfdoc;
    private String DocSpecialite;

}
