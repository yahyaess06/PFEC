package com.pfe.backend_pfe.DTO.AdministrateurRdvs;

import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestParame {

    private Date date;
    private String departement;
    private Staus s;
    private int page;
    private int size;
}
