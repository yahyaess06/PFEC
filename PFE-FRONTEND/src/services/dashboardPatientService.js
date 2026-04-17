/*import axios from "axios";

const API_URL = "http://localhost:9090/test/patient/dashboard";

export const getPatientDashboard = (patientId) => {
    return axios.get(API_URL, {
        params: {
            patient_id: patientId
        }
    });
};*/
import axios from "axios";
import {idPatient} from "./authService.js";
import api from "./api.js";

export function voireNotification(){
    const id=idPatient();
    return api.get(`/patient/notification/${id}`)
}

export const getPatientDashboard = () => {
    const token = localStorage.getItem("token");

    return axios.get("http://localhost:9090/patient/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


