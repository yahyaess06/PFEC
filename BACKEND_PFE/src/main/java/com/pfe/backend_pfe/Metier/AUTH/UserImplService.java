package com.pfe.backend_pfe.Metier.AUTH;

import com.pfe.backend_pfe.DTO.ResetDto;
import com.pfe.backend_pfe.Entities.*;
import com.pfe.backend_pfe.Exceptions.*;
import com.pfe.backend_pfe.Metier.Email.EmailService;
import com.pfe.backend_pfe.Security.JwtUtil;
import com.pfe.backend_pfe.reposetory.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Service
@AllArgsConstructor
@Transactional
public class UserImplService implements UsersService {
    //@Autowired
    private final PatientRepo patientRepo;
    private final MedcineRepo medR;
    private final InfermierRepo infR;
    private final PasswordEncoder pE;
    private final JwtUtil jU;
    private final UserReposetory userReposetory;
    private final EmailService es;
    private final TokenRepo tokenRepo;
    private final PersonnelRepo pr;

    @Override
    public void savePatient(Patient patient) {
        patient.setPassword(pE.encode(patient.getPassword()));
        patientRepo.save(patient);
    }

    @Override
    public String LoginUser(String email, String psw) {
        Patient p = patientRepo.findByEmail(email);
        if (p != null) {
            if (!pE.matches(psw, p.getPassword())) {
                throw new RuntimeException("Wrong password!!!");
            }

            return jU.generateToken(p.getId(), p.getRole().name());
        }

        Medecin m = medR.findByEmail(email);
        if (m != null) {
            if (!pE.matches(psw, m.getPassword())) {
                throw new RuntimeException("Wrong password!!!");
            }
            return jU.generateToken(m.getId(), m.getRole().name());
        }

        Infermier i = infR.findByEmail(email);
        if (i != null) {
            if (!pE.matches(psw, i.getPassword())) {
                throw new RuntimeException("Wrong password!!!");
            }
            return jU.generateToken(i.getId(), i.getRole().name());
        }

        throw new RuntimeException("useer not found!!!");

    }
    @Override
    public String LoginAdmin(String email, String psw){
        Personnel p=pr.findByEmail(email);
        if (p != null) {
            if (!pE.matches(psw, p.getPassword())) {
                throw new RuntimeException("Wrong password!!!");
            }

            return jU.generateToken(p.getId(), p.getRole().name());
        }
        throw new RuntimeException("useer not found!!!");
    }

    @Override
    public void creerToken(String email) throws UserNotFoundException{

        User user = userReposetory.findUserByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("user not found!!!");
        }
        Token t = new Token();
        t.setToken(UUID.randomUUID().toString());
        t.setUser(user);
        t.setExpiration(LocalDateTime.now().plusMinutes(10));
        tokenRepo.save(t);
        es.passwwordreswet(email, t.getToken());
    }

    @Override
    public void verifierUser(String email) throws UserNotFoundException, UserIsNotVerifiedException {
        Patient patient = patientRepo.findByEmail(email);
        if (patient == null) {
            throw new UserNotFoundException("user not found!!!");
        }
//        if (!patient.isVerified()){
//            throw new UserIsNotVerifiedException("user not verified");
//        }
        Token t = tokenRepo.findByUser(patient);

        if (t == null) {
            t = new Token();
        }
        t.setToken(UUID.randomUUID().toString());
        t.setUser(patient);
        t.setExpiration(LocalDateTime.now().plusMinutes(10));
        tokenRepo.save(t);
        es.accountConfirm(email,t.getToken());
    }

    @Override
    public void compteCree(String token) throws TokenNotValidException, TokenExpiredException {
        Token t = tokenRepo.findByToken(token);
        if (t == null) {
            throw new TokenNotValidException("token non valid");
        }
        boolean siexpired=t.getExpiration().isBefore(LocalDateTime.now());
        if(siexpired){
            tokenRepo.delete(t);
            throw new TokenExpiredException("token expiree");
        }
        Patient user=(Patient) t.getUser();
        user.setVerified(true);
        userReposetory.save(user);
        tokenRepo.delete(t);
    }

    @Override
    public void recreerPassword(ResetDto rstDto) throws TokenNotValidException, PasswordNotequalException, TokenExpiredException {

        Token t=tokenRepo.findByToken((rstDto.getToken()));
if(t==null){
    throw new TokenNotValidException("token non valid");
}
boolean siexpired=t.getExpiration().isBefore(LocalDateTime.now());
if(siexpired){
    tokenRepo.delete(t);
    throw new TokenExpiredException("token expiree");
}
User user=t.getUser();
if (!rstDto.getConfirmPassword().equals(rstDto.getPassword())) {
       throw new PasswordNotequalException("mots de passe non egal a confirmation");
}
        user.setPassword(pE.encode(rstDto.getPassword()));
        userReposetory.save(user);
        tokenRepo.delete(t);
    }

    @Override
    public Boolean isVerified(Long id) throws PatientNotfoundException {
        Patient p=patientRepo.findById(id).orElseThrow(()->new PatientNotfoundException("patient introuvable"));
        return p.isVerified();
    }


}
