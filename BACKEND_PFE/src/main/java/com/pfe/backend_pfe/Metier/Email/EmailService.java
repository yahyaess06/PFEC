package com.pfe.backend_pfe.Metier.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service

public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;
    public void passwwordreswet(String to,String token){
         String lien= "http://localhost:5173/reset-password?token="+token;
         SimpleMailMessage message=new SimpleMailMessage();
         message.setTo(to);
         message.setFrom(from);
         message.setSubject("Password reset");
         message.setText("Pour reinitialiser votre compte, vous devez cliquez sur le lien :\n"+lien);
             mailSender.send(message);
    }

    public void accountConfirm(String to,String token){
        String lien= "http://localhost:5173/verification?token="+token;
        SimpleMailMessage message=new SimpleMailMessage();
        message.setTo(to);
        message.setFrom(from);
        message.setSubject("Confirmation de compte");
        message.setText("Pour Verifier votre compte, vous devez cliquez sur le lien :\n"+lien);
        mailSender.send(message);
    }
}
