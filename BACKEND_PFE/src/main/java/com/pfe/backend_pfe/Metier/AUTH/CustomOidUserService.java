package com.pfe.backend_pfe.Metier.AUTH;

import com.pfe.backend_pfe.Entities.Medecin;
import com.pfe.backend_pfe.reposetory.InfermierRepo;
import com.pfe.backend_pfe.reposetory.MedcineRepo;
import com.pfe.backend_pfe.reposetory.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CustomOidUserService extends OidcUserService {

    @Autowired
    PatientRepo pr;
    @Autowired
    MedcineRepo mr;
    @Autowired
    InfermierRepo ir;
    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) {
        OidcUser oidcUser = super.loadUser(userRequest);

        String email = oidcUser.getEmail();
        // TODO: remplace par ta logique DB

        boolean isPatient = pr.existsByEmail(email);
        boolean isMedecin = mr.existsByEmail(email);
        boolean isInfermier = ir.existsByEmail(email);
        Set<GrantedAuthority> mappedAuthorities = new HashSet<>(oidcUser.getAuthorities());

        if (isPatient) mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_PATIENT"));
        else if (isMedecin) mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_MEDECIN"));
        else if (isInfermier) mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_INFERMIER"));
        else mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        return new org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser(
                mappedAuthorities,
                oidcUser.getIdToken(),
                oidcUser.getUserInfo(),
                "email"
        );
    }
}
