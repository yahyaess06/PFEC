package com.pfe.backend_pfe.Metier.Administrateur;


import com.pfe.backend_pfe.DTO.Administrateur.AdministrateurDTO;
import com.pfe.backend_pfe.DTO.Administrateur.PageAdministrateur;
import com.pfe.backend_pfe.DTO.CountInf;
import com.pfe.backend_pfe.Exceptions.DateApresException;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;

public interface IAdminService {
     AdministrateurDTO voireAdmin(Long id) throws PersonnelNotFOundException;
     AdministrateurDTO creerOuModifierAdmin(Long id,AdministrateurDTO admin) throws PersonnelNotFOundException, DateApresException;
     void supprimerDepuisHopital(Long id) throws PersonnelNotFOundException;
     PageAdministrateur voireAdmins(Long id, String nom, String cin, int page, int size) throws PersonnelNotFOundException;
     CountInf voireNombreDocs(Long id) throws PersonnelNotFOundException;

}
