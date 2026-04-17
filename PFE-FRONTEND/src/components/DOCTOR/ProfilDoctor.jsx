import React, { useEffect, useState } from "react";
import {
    Mail,
    Phone,
    User,
    Shield,
    Calendar,
    Camera,
    LogOut,
    Stethoscope
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { getMedecinProfile } from "../../services/MedProfileService.js";
import { logout } from "../../services/authService.js";

export default function ProfileDoctor() {
    const navigate = useNavigate();

    const [photoProfil, setPhotoProfil] = useState(
        "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
    );

    const [medecin, setMedecin] = useState({
        cin: "",
        nom: "",
        prenom: "",
        specialite: "",
        age: "",
        email: "",
        telephone: ""
    });

    useEffect(() => {
        const afficherMedecin = async () => {
            try {
                const res = await getMedecinProfile();
                setMedecin(res.data);
            } catch (error) {
                console.error("Erreur chargement profil :", error);
            }
        };

        afficherMedecin();
    }, []);

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setPhotoProfil(URL.createObjectURL(file));
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center p-8">

            <div className="w-full max-w-4xl relative rounded-3xl border border-cyan-100 bg-white shadow-xl p-12 overflow-hidden">

                {/* subtle glow */}
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>

                {/* HEADER */}
                <div className="flex items-center justify-between mb-12">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-wide">
                            Dr. {medecin.nom} {medecin.prenom}
                        </h1>

                        <p className="text-cyan-600 text-sm mt-2 tracking-wide uppercase font-semibold">
                            {medecin.specialite || "Spécialité non définie"}
                        </p>
                    </div>

                {/*    <div className="relative">*/}
                {/*        <div className="w-28 h-28 rounded-full border-2 border-cyan-500 p-1 shadow-md">*/}
                {/*            <img*/}
                {/*                src={photoProfil}*/}
                {/*                className="rounded-full object-cover w-full h-full"*/}
                {/*                alt="profile"*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                    <div className="relative">
                        <div className="w-28 h-28 rounded-full border-2 border-cyan-500 shadow-md
                                flex items-center justify-center
                                bg-gradient-to-br from-cyan-500 to-blue-500
                                text-white text-3xl font-bold tracking-wider">

                            {medecin.nom && medecin.prenom
                                ? `${medecin.nom.charAt(0).toUpperCase()}${medecin.prenom.charAt(0).toUpperCase()}`
                                : "--"}
                        </div>
                    </div>
                    </div>

                {/* INFOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <NeoTile label="IDENTITÉ" value={medecin.cin} />
                    <NeoTile label="ÂGE" value={`${medecin.age} ans`} />
                    <NeoTile label="EMAIL" value={medecin.email} />
                    <NeoTile label="TÉLÉPHONE" value={medecin.telephone} />

                </div>

                {/* ACTION */}
                <div className="mt-14 flex justify-center">
                    <button
                        onClick={handleLogout}
                        className="px-8 py-3 rounded-xl bg-red-100 text-red-600 font-semibold hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                        Déconnexion
                    </button>
                </div>

            </div>
        </div>
    );
}

function NeoTile({ label, value }) {
    return (
        <div className="p-6 rounded-2xl bg-white border border-cyan-100 hover:border-cyan-400 hover:shadow-md transition-all duration-300">

            <p className="text-xs text-cyan-600 tracking-widest uppercase mb-2 font-semibold">
                {label}
            </p>

            <p className="text-slate-700 text-lg font-semibold tracking-wide">
                {value || "-"}
            </p>

        </div>
    );


}