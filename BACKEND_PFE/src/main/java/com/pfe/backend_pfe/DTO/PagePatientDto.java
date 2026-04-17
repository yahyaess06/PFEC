package com.pfe.backend_pfe.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PagePatientDto {
    private List<FullNamePatientDto> patients;
    private int currentPage;
    private int pageSize;
    private int totalPages;
}
