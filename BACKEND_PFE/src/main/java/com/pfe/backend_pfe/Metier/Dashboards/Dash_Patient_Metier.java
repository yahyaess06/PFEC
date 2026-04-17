package com.pfe.backend_pfe.Metier.Dashboards;

import com.pfe.backend_pfe.DTO.Dash_PatientDto;

public interface Dash_Patient_Metier {
    Dash_PatientDto getDash_Patient(Long patient_id);
}
