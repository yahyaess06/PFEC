package com.pfe.backend_pfe.Metier.Status;

import com.pfe.backend_pfe.Entities.Enumerations.Staus;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IStausService {
    public List<Staus> getAllStaus();
}
