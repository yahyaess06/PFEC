package com.pfe.backend_pfe.DTO.AdministrateurRdvs;

import com.pfe.backend_pfe.DTO.Administrateur.AdministrateurDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PagerDto {
    private List<RdvsAdminDto> ads;
    private int currentPage;
    private int pageSize;
    private int totalPages;
}
