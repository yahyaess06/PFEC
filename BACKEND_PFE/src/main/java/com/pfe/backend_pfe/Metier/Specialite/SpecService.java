package com.pfe.backend_pfe.Metier.Specialite;

import com.pfe.backend_pfe.DTO.SpecialiteDto;
import com.pfe.backend_pfe.Entities.Specialite;
import com.pfe.backend_pfe.Exceptions.SpecNullException;
import com.pfe.backend_pfe.Mappers.SpecMapper;
import com.pfe.backend_pfe.reposetory.SpecRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class SpecService implements ISpecService{
    private final SpecRepo spr;
    private final SpecMapper sm;

    @Override
    public List<SpecialiteDto> getSpecialite() throws SpecNullException {
        List<Specialite> sp=spr.findAll();
        if(sp.isEmpty()){
            throw new SpecNullException("no spec !");
        }
        return sp.stream().
                map(spec->sm.SpectoSpecDto(spec))
                .toList();
    }
}
