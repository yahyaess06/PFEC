package com.pfe.backend_pfe.reposetory;

import com.pfe.backend_pfe.Entities.Specialite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SpecialiteRepo extends JpaRepository<Specialite, Long> {
Specialite findByNomspec(String name);
}
