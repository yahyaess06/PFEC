package com.pfe.backend_pfe.Metier.RvEnseint;

import com.pfe.backend_pfe.DTO.RV_EnseintDto.EnseintDto;
import com.pfe.backend_pfe.Entities.Rendez_Vous;
import com.pfe.backend_pfe.Exceptions.*;

public interface Rv_EnseintMetier {
    void saveRvEnseint(EnseintDto enseintDto) throws HospitalNotFound, PatientNotfoundException, HoptialNotfoundException, GynecologeNotFound, DossierNotFoundException;
}
