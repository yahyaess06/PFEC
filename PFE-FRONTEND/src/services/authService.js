import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:9090/auth";

export async function login(email, password) {
    const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
    });

    const token = res.data.token;
    localStorage.setItem("token", token);
    return token;
}

export function idPatient(){
   const token= localStorage.getItem("token");
    const decoded = jwtDecode(token);
    return  decoded.sub;
}

// ma2a9at
export function idMedecin(){
    //return localStorage.getItem("token")
    const token= localStorage.getItem("token");
    if (!token) {
        return null;
    }const d = jwtDecode(token);
    console.log(d);
    return  d.sub;
}

export function logout() {
    localStorage.removeItem("token");
}

export function getToken() {
    const token= localStorage.getItem("token");
    if (!token) {
        return null;
    }
    return token
}

export async function loginAdmin(email, password){
    const res = await axios.post(`${API_URL}/login/admin`, {
        email,
        password,
    });
    const token = res.data.token;
    localStorage.setItem("token", token);
    return token;
}

export function isAuthenticated() {
    return !!getToken();
}

export function getUserRole(){
    const token = localStorage.getItem("token");
    if (!token){
        return null;
    }
    const d = jwtDecode(token);
    return d.role;
}