package com.pfe.backend_pfe.Presentation.Users;


import com.pfe.backend_pfe.DTO.LoginDtos.LoginReq;
import com.pfe.backend_pfe.DTO.LoginDtos.LoginRes;
import com.pfe.backend_pfe.DTO.ResetDto;
import com.pfe.backend_pfe.DTO.UtilisateurRegister;
import com.pfe.backend_pfe.Entities.Dossier;
import com.pfe.backend_pfe.Entities.Enumerations.User_Role;
import com.pfe.backend_pfe.Entities.Patient;

import com.pfe.backend_pfe.Exceptions.*;
import com.pfe.backend_pfe.Metier.AUTH.UserImplService;
import com.pfe.backend_pfe.Metier.Patient.IPatientService;
import com.pfe.backend_pfe.reposetory.DossierRepo;
import com.pfe.backend_pfe.reposetory.PatientRepo;
import com.pfe.backend_pfe.reposetory.UserReposetory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Transactional
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin("*")
public class UsersController {

   private final UserImplService userService;
   private final DossierRepo dr;
   private final PatientRepo pr;
private final PasswordEncoder pe;

    @PostMapping("/register")
    public void nvUser(@RequestBody UtilisateurRegister ur) throws PasswordNotequalException, EmailErrorException, CinException, UserNotFoundException, UserIsNotVerifiedException {
        Patient p=new Patient();
        if (pr.existsByCin(ur.getCin())) {
            throw new CinException("erreur cin deja etuliser  ");
        }
        p.setCin(ur.getCin());
        p.setNom(ur.getNom());
        p.setPrenom(ur.getPrenom());
        Patient e=pr.findByEmail(ur.getEmail());
        if (e!=null && e.isVerified()) {
            throw new EmailErrorException("erreur mail repeter ");
        }
        if (e != null && !e.isVerified()) {
            dr.deleteByPatientId(e.getId());
            pr.delete(e);
        }
        p.setEmail(ur.getEmail());

        p.setTelephone(ur.getTelephone());

        if(ur.getConfirmPassword().equals(ur.getPassword())) {
            p.setPassword(pe.encode(ur.getPassword()));
        }else{
            throw new PasswordNotequalException("les mots de passes sont incoherants ! ");
        }
        p.setSexe(ur.getSexe());
        p.setAge(ur.getAge());
        p.setAdresse(ur.getAdresse());
        p.setRole(User_Role.PATIENT);
        p.setVerified(false);
        Dossier d=new Dossier();
        d.setPatient(p);
        pr.save(p);
        dr.save(d);
        userService.verifierUser(ur.getEmail());
    }

    @GetMapping("/validation")
    public void verificationconfirmer(@RequestParam String token) throws TokenExpiredException, TokenNotValidException {
        System.out.println("validation token = " + token);
         userService.compteCree(token);
    }

    @GetMapping("isVerified/{id}")
    public Boolean isVerified(@PathVariable Long id) throws PatientNotfoundException {
        return userService.isVerified(id);
    }
    @PostMapping("/reverifier/{id}")
    public void reverifier(@PathVariable Long id) throws PatientNotfoundException, UserNotFoundException, UserIsNotVerifiedException {
        Patient p=pr.findById(id).orElseThrow(()->new PatientNotfoundException("Patient not found"));
        userService.verifierUser(p.getEmail());
    }

    @PostMapping("/login")
    public LoginRes Login(@RequestBody LoginReq lR)
    {
        String token = userService.LoginUser(lR.getEmail(), lR.getPassword());
        return new LoginRes(token);
    }

    @PostMapping("/login/admin")
    public LoginRes loginAdmin(@RequestBody LoginReq lR){
        String token=userService.LoginAdmin(lR.getEmail(), lR.getPassword());
        return new LoginRes(token);
    }

    @PostMapping("/token/{email}")
    public void envoiToken(@PathVariable String email) throws UserNotFoundException, EmailNotSentException {
        userService.creerToken(email);
    }

    @PostMapping("/token")
    public void resetPassword(@RequestBody ResetDto r) throws PasswordNotequalException, TokenNotValidException, TokenExpiredException {
        userService.recreerPassword(r);
    }
}
