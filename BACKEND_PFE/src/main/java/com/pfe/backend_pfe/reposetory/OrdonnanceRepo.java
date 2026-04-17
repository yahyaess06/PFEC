package com.pfe.backend_pfe.reposetory;

import com.pfe.backend_pfe.Entities.Ordonnance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdonnanceRepo extends JpaRepository<Ordonnance, Long> {
}
