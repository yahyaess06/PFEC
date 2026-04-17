package com.pfe.backend_pfe.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    //private final SecretKey secretKry = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final String SECRET =
            "my-super-secret-key-256-bits-minimum-my-super-secret";

    private final SecretKey secretKry =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(Long user_id, String role)
    {
        return Jwts.builder()
                .setSubject(user_id.toString())
                .claim("role", role)
                .setIssuedAt(new Date())
                //.setExpiration(new Date((new Date()).getTime() + 1000 * 60 * 60 * 24))
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // nafs lma3na m2a gha ctm ki3ti time b lmile seconde
                .signWith(secretKry)
                .compact();
    }

    public Long exttactPatientId(String token)
    {
        Claims c = Jwts.parserBuilder()
                .setSigningKey(secretKry)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return Long.parseLong(c.getSubject());
    }

    public String extractRole(String token) {
        Claims c = Jwts.parserBuilder()
                .setSigningKey(secretKry)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return c.get("role", String.class);
    }


}
