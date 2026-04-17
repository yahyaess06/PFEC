import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {getUserRole, loginAdmin} from "../../services/authService.js";

export default function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValid, setEmailValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(regex.test(value));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordValid(value.length >= 6);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailValid || !passwordValid) {
            alert("Veuillez saisir des informations valides.");
            return;
        }

        try {
            await loginAdmin(email, password);

            const role = getUserRole();

            if (role === "ADMIN" || role ==="DIRECTOR") {
                navigate("/administration/dashboard",{ replace: true });
            } else {
                // Optionnel : tu peux aussi faire un logout ici si tu as une fonction logout()
                alert("Accès refusé : vous n’êtes pas administrateur.");
                navigate("/login");
            }
        } catch (error) {
            alert("Email ou mot de passe incorrect");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-white p-6 animate-fadeIn">
            <div className="w-full max-w-4xl bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-10 border border-white/20 flex flex-col md:flex-row gap-8 animate-slideUp">

                {/* Section logo */}
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828466.png"
                        alt="Logo Admin"
                        className="w-28 drop-shadow-lg animate-bounce"
                    />
                    <h1 className="text-3xl font-extrabold text-blue-700 mt-2">
                        Connexion Administrateur
                    </h1>
                    <p className="text-gray-600 text-lg mt-2 px-4">
                        Accès réservé au personnel autorisé.
                    </p>
                </div>

                {/* Formulaire */}
                <div className="flex-1 flex flex-col justify-start items-end">
                    <form className="space-y-5 w-full max-w-sm" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-gray-700 font-medium">Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={handleEmailChange}
                                className={`w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 outline-none transition text-black ${
                                    emailValid === null
                                        ? "border-gray-300 focus:ring-blue-400"
                                        : emailValid
                                            ? "border-green-500 focus:ring-green-400"
                                            : "border-red-500 focus:ring-red-400"
                                } bg-gray-50`}
                                placeholder="admin@exemple.com"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 font-medium">Mot de passe</label>
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={`w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 outline-none transition text-black ${
                                    passwordValid === null
                                        ? "border-gray-300 focus:ring-blue-400"
                                        : passwordValid
                                            ? "border-green-500 focus:ring-green-400"
                                            : "border-red-500 focus:ring-red-400"
                                } bg-gray-50`}
                                placeholder="Entrez votre mot de passe"
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg text-base font-semibold hover:bg-blue-700 transition"
                        >
                            Se connecter
                        </button>
                    </form>

                    {/* Actions secondaires */}
                    <div className="flex flex-col w-full max-w-sm mt-6 gap-3 items-end">
                        <p className="text-gray-600 text-sm">
                            Retour à la page{" "}
                            <Link to="/login" className="text-blue-600 font-medium hover:underline">
                                utilisateur
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}