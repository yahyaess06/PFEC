package com.pfe.backend_pfe.Security;

import com.pfe.backend_pfe.Entities.Infermier;
import com.pfe.backend_pfe.Entities.Medecin;
import com.pfe.backend_pfe.Entities.Patient;
import com.pfe.backend_pfe.reposetory.InfermierRepo;
import com.pfe.backend_pfe.reposetory.MedcineRepo;
import com.pfe.backend_pfe.reposetory.PatientRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final PatientRepo patientRepo;
    private final MedcineRepo medcineRepo;
    private final InfermierRepo infermierRepo;

    public CustomOAuth2SuccessHandler(JwtUtil jwtUtil, PatientRepo patientRepo, MedcineRepo medcineRepo, InfermierRepo infermierRepo) {
        this.jwtUtil = jwtUtil;
        this.patientRepo = patientRepo;
        this.medcineRepo = medcineRepo;
        this.infermierRepo = infermierRepo;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OidcUser oidcUser = (OidcUser) authentication.getPrincipal();
        String email = oidcUser.getEmail();
        Long id;
        String role;

        Patient patient = patientRepo.findByEmail(email);

        if (patient != null) {
            id = patient.getId();
            role = "PATIENT";
        } else {
            Medecin med = medcineRepo.findByEmail(email);
            if (med != null) {
                id = med.getId();
                role = "MEDECIN";
            } else {
                Infermier inf= infermierRepo.findByEmail(email);
                if (inf != null) {
                    id = inf.getId();
                    role="INFERMIER";
                }else{
                response.sendRedirect("http://localhost:5173/choose-role");
                return;
            }}
        }
        String jwt = jwtUtil.generateToken(id, role);

        String targetUrl = "http://localhost:5173/oauth2/redirect"
                + "?token=" + URLEncoder.encode(jwt, StandardCharsets.UTF_8)
                + "&role=" + role;

        System.out.println("JWT: " + jwt);
        response.sendRedirect(targetUrl);
    }
}