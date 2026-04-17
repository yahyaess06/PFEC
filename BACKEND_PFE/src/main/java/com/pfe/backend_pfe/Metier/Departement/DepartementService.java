package com.pfe.backend_pfe.Metier.Departement;

import com.pfe.backend_pfe.DTO.AdministrateurRdvs.DepartementNomsDto;
import com.pfe.backend_pfe.DTO.DepartementsDto;
import com.pfe.backend_pfe.DTO.ListDepartementDto;
import com.pfe.backend_pfe.Entities.Personnel;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;
import com.pfe.backend_pfe.reposetory.MedcineRepo;
import com.pfe.backend_pfe.reposetory.PersonnelRepo;
import com.pfe.backend_pfe.reposetory.SpecialiteRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
@AllArgsConstructor
public class DepartementService implements IdepartementService{
    private final SpecialiteRepo sp;
    private final MedcineRepo mr;
    private final PersonnelRepo pr;
    @Override
    public ListDepartementDto voireDataDepartements(Long id,int page, int size) throws PersonnelNotFOundException {
        Personnel p=pr.findById(id).orElseThrow(()->new PersonnelNotFOundException("ya pas de personnel"));
        Page<DepartementsDto> dtos=mr.findBySpecialitecount(p.getHopital().getId_hopital(),PageRequest.of(page, size));
        ListDepartementDto dto=new ListDepartementDto();
        dto.setDeps(dtos.getContent());
        dto.setTotalPages(page);
        dto.setPageSize(size);
        return dto;
    }
    @Override
    public List<DepartementNomsDto> voireDeps(Long id) throws PersonnelNotFOundException {
        Personnel p=pr.findById(id).orElseThrow(()->new PersonnelNotFOundException("ya pas de personnel"));
        return mr.FindDepartementNameByHopitalId(p.getHopital().getId_hopital());
    }

}
