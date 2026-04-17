package com.pfe.backend_pfe.Metier.Medicament;

import com.pfe.backend_pfe.DTO.MedicamentDto;
import com.pfe.backend_pfe.DTO.VoireMedicamentDto;
import com.pfe.backend_pfe.Exceptions.MedicamentsIntrouvableException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IMedicamentService {
//List<MedicamentDto> voireTousMedicaments();

    VoireMedicamentDto voireTousMedicaments(String nom,int page, int size) throws MedicamentsIntrouvableException;
}
