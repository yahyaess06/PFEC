package com.pfe.backend_pfe.Metier.Medecin;

import com.pfe.backend_pfe.DTO.MedecinProfileDto;
import com.pfe.backend_pfe.DTO.PatientDto;
import com.pfe.backend_pfe.Exceptions.MedcinNotFoundException;
import com.pfe.backend_pfe.DTO.*;
import com.pfe.backend_pfe.Entities.Specialite;
import com.pfe.backend_pfe.Exceptions.DateApresException;
import com.pfe.backend_pfe.Exceptions.MedcinNotFoundException;
import com.pfe.backend_pfe.Exceptions.PatientNotfoundException;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;

public interface MedecinService {
    //MedecinProfileDto voireMedecin(Long medId) throws MedcinNotFoundException;
//    void modifie(MedecinProfileDto medecinProfileDto);
    MedecinProfileDto voireMedecin(Long medId) throws MedcinNotFoundException;
    //void modifie(MedecinProfileDto medecinProfileDto);

    CountDocDto voireNombreDocs(Long id) throws PersonnelNotFOundException;

    PageMedcinDto voireMedcines(Long id, String nom,String cin, String spec, int page, int size) throws PersonnelNotFOundException, MedcinNotFoundException;

//    void creerMed(CreationDocDto c,Long id) throws PersonnelNotFOundException;


    void creerOuModifierMed(CreationDocDto c, Long idPersonnel) throws PersonnelNotFOundException, DateApresException;

//    void modifier(CreationDocDto c, Long id) throws PersonnelNotFOundException, MedcinNotFoundException;



    CreationDocDto voireMed(Long id) throws  MedcinNotFoundException;

    void supprimerDepuisHopital(Long id)throws MedcinNotFoundException;
}
