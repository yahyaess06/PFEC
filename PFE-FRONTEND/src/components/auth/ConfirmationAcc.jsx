import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationAcc = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        console.log("token =", token);

        const compteConfirmer = async () => {
            try {
                const response = await fetch(`http://localhost:9090/auth/validation?token=${token}`, {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la validation");
                }

                navigate("/auth/login", { replace: true });
            } catch (error) {
                console.error("Erreur de confirmation", error);
            }
        };

        if (token) {
            compteConfirmer();
        }
    }, [navigate]);

    return <div>Confirmation du compte...</div>;
};

export default ConfirmationAcc;