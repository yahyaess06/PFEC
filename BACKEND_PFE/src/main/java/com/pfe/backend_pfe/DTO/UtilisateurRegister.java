package com.pfe.backend_pfe.DTO;

import com.pfe.backend_pfe.Entities.Patient;
import com.pfe.backend_pfe.Entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UtilisateurRegister {
    private String cin;
    private String nom;
    private String prenom;
    private String email;
    private int age;
    private String telephone;
    private String password;
    private String confirmPassword;
    private String sexe;
    private String adresse;
}
