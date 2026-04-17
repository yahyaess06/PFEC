package com.pfe.backend_pfe.DTO;

import lombok.Data;

import java.util.List;

@Data
public class ListDepartementDto {
    private List<DepartementsDto> deps;
    private int currentPage;
    private int pageSize;
    private int totalPages;
}
