package com.pfe.backend_pfe.reposetory;

import com.pfe.backend_pfe.Entities.Specialite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpecRepo extends JpaRepository<Specialite,Long> {

Specialite findSpecialiteByNomspec(String spec);
//List<Specialite> findSpecialiteByNomspecIgnoreCase(String spec);
}
