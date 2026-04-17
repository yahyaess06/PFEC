package com.pfe.backend_pfe.Security;

import com.pfe.backend_pfe.Metier.AUTH.CustomOidUserService;
import com.pfe.backend_pfe.reposetory.InfermierRepo;
import com.pfe.backend_pfe.reposetory.MedcineRepo;
import com.pfe.backend_pfe.reposetory.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
//@EnableWebSecurity
@EnableMethodSecurity
public class SecConfig {

    @Autowired
    private CustomOidUserService customOidcUserService;

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Autowired private JwtUtil jwtUtil;
    @Autowired private PatientRepo patientRepo;
    @Autowired private MedcineRepo medcineRepo;
    @Autowired private InfermierRepo infermierRepo;


    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type"
        ));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .headers(headers -> headers
                        .contentSecurityPolicy(csp -> csp
                                .policyDirectives(
                                        "default-src 'self'; " +
                                                "script-src 'self' 'unsafe-inline'; " +
                                                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                                                "font-src 'self' https://fonts.gstatic.com data:; " +
                                                "img-src 'self' data: blob:; " +
                                                "connect-src 'self' http://localhost:5173 http://localhost:9090 http://localhost:8080; " +
                                                "frame-ancestors 'none'; " +
                                                "object-src 'none';"
                                )
                        )
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::deny)
                )
                .formLogin(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
               // .headers(h -> h.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/auth/login","/auth/register","/auth/validation","/auth/login/admin","/oauth2/**","/h2-console/**","/login/oauth2/**","/auth/token/**","/Regions")
                                .permitAll()
                        .anyRequest().authenticated()
                )
                .exceptionHandling(e -> e
                .authenticationEntryPoint((req, res, ex) -> res.sendError(401))
        ).oauth2Login(
                        oauth2->
                                oauth2.successHandler(oAuth2SuccessHandler())
                                        .userInfoEndpoint(u->u.oidcUserService(customOidcUserService))
                                        )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();

    }
    @Bean
    public AuthenticationSuccessHandler oAuth2SuccessHandler() {
        return new CustomOAuth2SuccessHandler(jwtUtil, patientRepo, medcineRepo,infermierRepo);
    }

}
