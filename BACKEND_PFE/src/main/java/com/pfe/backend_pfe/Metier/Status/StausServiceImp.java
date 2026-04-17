package com.pfe.backend_pfe.Metier.Status;

import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class StausServiceImp implements IStausService {
    @Override
    public List<Staus> getAllStaus() {
        List<Staus> staus = new ArrayList<>();
        staus.add(Staus.Confirmer);
        staus.add(Staus.anullee);
        staus.add(Staus.Valide);
        staus.add(Staus.Terminer);
        return staus;
    }
}
