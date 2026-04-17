package com.pfe.backend_pfe.Metier.Specialite;

import com.pfe.backend_pfe.DTO.SpecialiteDto;
import com.pfe.backend_pfe.Exceptions.SpecNullException;

import java.util.List;

public interface ISpecService {
    public List<SpecialiteDto> getSpecialite() throws SpecNullException;
}
