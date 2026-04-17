package com.pfe.backend_pfe.DTO.AdministrateurRdvs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pagerr {
    private List<RdvsAdDto> ads;
    private int currentPage;
    private int pageSize;
    private int totalPages;
}
