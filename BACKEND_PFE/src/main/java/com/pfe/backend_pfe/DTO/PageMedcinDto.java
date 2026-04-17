package com.pfe.backend_pfe.DTO;

import lombok.Data;

import java.util.List;

@Data
public class PageMedcinDto {
    private List<MedecinsDto> ms;
    private List<MedecinDto> meds;
    private int currentPage;
    private int pageSize;
    private int totalPages;
}
