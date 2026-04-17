package com.pfe.backend_pfe.DTO.Administrateur;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageAdministrateur {
    private List<AdministrateurDTO> ads;
    private int currentPage;
    private int pageSize;
    private int totalPages;
}
