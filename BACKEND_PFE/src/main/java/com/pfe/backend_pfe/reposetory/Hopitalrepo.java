package com.pfe.backend_pfe.reposetory;

import com.pfe.backend_pfe.Entities.Enumerations.Regions;
import com.pfe.backend_pfe.Entities.Hopital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Hopitalrepo extends JpaRepository<Hopital, Long> {

List<Hopital> findHopitalByRegions(Regions rgs);


    @Query("Select count(h) From Hopital h WHERE h.regions= :region")
    int findHopByRegion(@Param("region") Regions region);
    @Query("Select h.nom_hopital From Hopital h WHERE h.regions= :region ")
    List<String> findnomaleatoireByRegion(@Param("region") Regions region);
}
