package com.pfe.backend_pfe.Metier.Infermiers;

import com.pfe.backend_pfe.DTO.*;
import com.pfe.backend_pfe.Exceptions.DateApresException;
import com.pfe.backend_pfe.Exceptions.InfermierNotFoundException;
import com.pfe.backend_pfe.Exceptions.MedcinNotFoundException;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;

import java.util.List;

public interface IInfermierService {
    CountInf voireNombreDocs(Long id) throws PersonnelNotFOundException;

    List<String> listSpecInfermier();

    PageInfermierDto voireMedcines(Long id, String nom, String cin, String spec, int page, int size) throws PersonnelNotFOundException, InfermierNotFoundException;
    void creerOuModifierInf(CreationInfDto c, Long idPersonnel) throws PersonnelNotFOundException, DateApresException;
    CreationInfDto voireMed(Long id) throws PersonnelNotFOundException;
    void supprimerDepuisHopital(Long id) throws PersonnelNotFOundException;
}
