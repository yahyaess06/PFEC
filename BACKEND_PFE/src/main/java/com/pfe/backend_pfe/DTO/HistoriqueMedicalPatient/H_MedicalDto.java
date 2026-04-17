package com.pfe.backend_pfe.DTO.HistoriqueMedicalPatient;

import com.pfe.backend_pfe.Entities.Enumerations.G_Sanguin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class H_MedicalDto {
    private G_Sanguin g_sanguin;
    private String allergisNotes;
    private String ttmt_Actuel;
    private List<Patient_HistoryM> pHistorys;
    private List<Patient_HistoryM> pHistorysInferm;//tzadt
}
