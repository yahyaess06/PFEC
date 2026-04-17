package com.pfe.backend_pfe.DTO.LoginDtos;

import lombok.Data;

@Data
public class LoginReq {
    //private String cin; // ma3rafch hta nbadloha l mail ola chi haja khra
    private String email;
    private String password;
}
