package com.pfe.backend_pfe.reposetory;

import com.pfe.backend_pfe.Entities.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccinationRepo extends JpaRepository<Vaccination, Long> {
}
