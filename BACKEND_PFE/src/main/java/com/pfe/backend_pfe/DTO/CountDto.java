package com.pfe.backend_pfe.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CountDto {
    private Long countRdvTotal;
    private Long countRdvterminer;
    private Long countRdvenAttend;
}
