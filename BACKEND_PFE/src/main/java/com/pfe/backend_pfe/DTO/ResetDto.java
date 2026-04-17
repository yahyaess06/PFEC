package com.pfe.backend_pfe.DTO;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetDto {
    private String token;
    private String password;
    private String confirmPassword;
}
