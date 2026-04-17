package com.pfe.backend_pfe.Entities;

import com.pfe.backend_pfe.Entities.Enumerations.User_Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;


//@Builder
@Entity
@Table(name = "Utilisateur")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Data
@ToString
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cin;
    private String nom;
    private String prenom;
    private String email;
    private int age;
    private String telephone;
    private String password;
    @Enumerated(EnumType.STRING)
    private User_Role role;
    //@OneToMany(mappedBy = "user")
    //private Collection<Session> sessions;
    //@Enumerated(EnumType.STRING)
    //private Permission permission;

}
