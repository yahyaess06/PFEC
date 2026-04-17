package com.pfe.backend_pfe.Metier.Medicament;

import com.pfe.backend_pfe.DTO.MedicamentDto;
import com.pfe.backend_pfe.DTO.VoireMedicamentDto;
import com.pfe.backend_pfe.Exceptions.MedicamentsIntrouvableException;
import com.pfe.backend_pfe.reposetory.MedicamentRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class MedicamentService implements IMedicamentService{

    @Autowired
    private MedicamentRepo mr;

    @Override
    public VoireMedicamentDto voireTousMedicaments(String nom,int page, int size) throws MedicamentsIntrouvableException {
    String name=nom.toUpperCase();
    Page<MedicamentDto> m=mr.findAllMedicamentsByName(name,PageRequest.of(page, size));
    if(m==null){
        throw new MedicamentsIntrouvableException("y a pas de medicament");
    }
    VoireMedicamentDto dto=new VoireMedicamentDto();
    dto.setMeds(m.getContent());
    dto.setPageSize(size);
    dto.setCurrentPage(page);
    dto.setTotalPages(m.getTotalPages());
        return dto;
    }
}
