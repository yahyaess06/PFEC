import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuth2Redirect() {
    const navigate = useNavigate();
    const handledRef = useRef(false);

    useEffect(() => {
        if (handledRef.current) return;
        handledRef.current = true;
        //handledRef permet dexecuter le code unse seul fois cr react 18 execute le code 2 fois pour voire si il ya des bugs ...


        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const role = params.get("role");

        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        localStorage.setItem("token", token);


        if (role === "PATIENT") navigate("/patient/dashboard", { replace: true });
        else if (role === "MEDECIN") navigate("/doctor/dashboard", { replace: true });
        else if (role === "INFERMIER") navigate("/infirmier/dashboard", { replace: true });
        else navigate("/principale", { replace: true });
    }, [navigate]);

    return <div>Connexion en cours...</div>;
}