package com.pfe.backend_pfe.Metier.Infermier;

import com.pfe.backend_pfe.DTO.InfirmierRdvDto.ProfileInfDto;
import com.pfe.backend_pfe.Entities.Infermier;
import com.pfe.backend_pfe.Exceptions.InfermierIntrouvableException;
import com.pfe.backend_pfe.reposetory.InfermierRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class ProfileInfImpl implements ProfileInfMetier{

    private final InfermierRepo iR;

    @Override
    public ProfileInfDto getProfileInfDto(Long idInf) throws InfermierIntrouvableException {
        Infermier i = iR.findById(idInf).orElseThrow(()-> new InfermierIntrouvableException("Infermier not found!!"));
        return new ProfileInfDto(
                i.getCin(),
                i.getPrenom(),
                i.getNom(),
                i.getSpecialite(),
                i.getAge(),
                i.getTelephone(),
                i.getEmail()
                //aykhas nzido sexe o adress
        );
    }
}
