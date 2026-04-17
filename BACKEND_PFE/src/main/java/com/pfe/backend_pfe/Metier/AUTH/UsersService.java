package com.pfe.backend_pfe.Metier.AUTH;

import com.pfe.backend_pfe.DTO.ResetDto;
import com.pfe.backend_pfe.Entities.Patient;
import com.pfe.backend_pfe.Entities.Token;
import com.pfe.backend_pfe.Exceptions.*;

public interface UsersService {
    public void savePatient(Patient patient);
    //public void LoginUser(String cin,String psw);
    public String LoginUser(String email,String psw);

    String LoginAdmin(String email, String psw);

    void creerToken(String email) throws UserNotFoundException, EmailNotSentException;

    void verifierUser(String email) throws UserNotFoundException, UserIsNotVerifiedException;

    void compteCree(String token) throws TokenNotValidException, TokenExpiredException;

    void recreerPassword(ResetDto rstDto) throws TokenNotValidException, PasswordNotequalException, TokenExpiredException;

    Boolean isVerified(Long id) throws PatientNotfoundException;
}
