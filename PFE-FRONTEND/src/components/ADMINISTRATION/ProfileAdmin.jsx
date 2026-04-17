import React, { useEffect, useState } from "react";
import {
    Mail,
    Phone,
    User,
    ShieldCheck,
    IdCard,
    Camera,
    LogOut,
    Save,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import {idPatient, logout} from "../../services/authService.js";
import { creerOuModifierAdmin, voirAdmin } from "../../services/AdminService.js";

export default function ProfileAdmin() {
    const navigate = useNavigate();

    const [photoProfil, setPhotoProfil] = useState(
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    );

    const [admin, setAdmin] = useState({
        id: idPatient(),
        cin: "",
        nom: "",
        prenom: "",
        mail: "",
        tel: "",
        age: 0,
        datearrive: "",
        password: "",
    });

    const [editMode, setEditMode] = useState(false);

    // ✅ MODAL (sans changer tes variables existantes)
    const [openModal, setOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("success"); // success | error

    /* 🔹 Charger données admin */
    const fetchAdmin = async () => {
        try {
            const id = idPatient();
            const res = await voirAdmin(id);
            setAdmin(res?.data || {});
        } catch (err) {
            console.error("Erreur chargement admin", err);
            setModalType("error");
            setModalTitle("Erreur");
            setModalMessage("Erreur lors du chargement du profil.");
            setOpenModal(true);
        }
    };

    useEffect(() => {
        fetchAdmin();
    }, []);

    /* 🔹 Modifier champs */
    const handleChange = (field, value) => {
        setAdmin((prev) => ({ ...prev, [field]: value }));
    };

    /* 🔹 Sauvegarder */
    const handleSave = async () => {
        try {
            await creerOuModifierAdmin(admin);
            setEditMode(false);

            setModalType("success");
            setModalTitle("Succès");
            setModalMessage("Profil administrateur mis à jour.");
            setOpenModal(true);
        } catch (e) {
            console.error(e);

            setModalType("error");
            setModalTitle("Erreur");
            setModalMessage("Erreur lors de la mise à jour.");
            setOpenModal(true);
        }
    };

    /* 🔹 Déconnexion */
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
            {/* ✅ MODAL (modern, simple, sans emojis/stickers) */}
            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] border border-slate-100 overflow-hidden">
                        <div className="p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2
                                        className={`text-lg font-semibold ${
                                            modalType === "success" ? "text-slate-900" : "text-slate-900"
                                        }`}
                                    >
                                        {modalTitle}
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-600">{modalMessage}</p>
                                </div>

                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
                                    aria-label="Fermer"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="mt-5 flex justify-end gap-3">
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="px-5 py-2 rounded-xl bg-slate-900 text-white font-medium"
                                >
                                    OK
                                </button>
                            </div>
                        </div>

                        {/* petite barre en bas (modern) */}
                        <div
                            className={`h-1 w-full ${
                                modalType === "success" ? "bg-emerald-500" : "bg-red-500"
                            }`}
                        />
                    </div>
                </div>
            )}

            {/* Background décoratif */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-100/40 rounded-full blur-[120px]" />

            <div className="relative w-full max-w-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="p-10 flex flex-col items-center">
                    {/* NOM + ROLE */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-slate-900">
                            {admin.nom} <span className="text-blue-600">{admin.prenom}</span>
                        </h1>

                        <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                            <ShieldCheck size={14} className="text-blue-600" />
                            <span className="text-xs font-bold text-blue-700 uppercase">
                Administrateur Système
              </span>
                        </div>
                    </div>

                    {/* INFOS */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoTile
                            icon={<IdCard size={18} />}
                            label="CIN"
                            value={admin.cin}
                            editable={editMode}
                            onChange={(v) => handleChange("cin", v)}
                        />

                        <InfoTile
                            label="Nom"
                            value={admin.nom}
                            editable={editMode}
                            onChange={(v) => handleChange("nom", v)}
                        />

                        <InfoTile
                            label="Prénom"
                            value={admin.prenom}
                            editable={editMode}
                            onChange={(v) => handleChange("prenom", v)}
                        />

                        <InfoTile
                            icon={<Mail size={18} />}
                            label="Email"
                            value={admin.mail}
                            editable={editMode}
                            onChange={(v) => handleChange("mail", v)}
                        />

                        <InfoTile
                            icon={<Phone size={18} />}
                            label="Téléphone"
                            value={admin.tel}
                            editable={editMode}
                            onChange={(v) => handleChange("tel", v)}
                        />

                        <InfoTile
                            label="Âge"
                            value={admin.age}
                            editable={editMode}
                            onChange={(v) => handleChange("age", v)}
                        />

                        <InfoTile
                            label="Date d'arrivée"
                            value={
                                admin.datearrive
                                    ? new Date(admin.datearrive).toLocaleDateString("fr-FR")
                                    : "-"
                            }
                            editable={editMode}
                            onChange={(v) => handleChange("datearrive", v)}
                        />
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-10 flex gap-4">
                        {!editMode ? (
                            <button
                                onClick={() => setEditMode(true)}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
                            >
                                Modifier
                            </button>
                        ) : (
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
                            >
                                <Save size={18} />
                                Sauvegarder
                            </button>
                        )}

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-xl"
                        >
                            <LogOut size={18} />
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* 🔹 Ligne info */
function InfoTile({ icon, label, value, editable, onChange }) {
    return (
        <div className="flex items-center gap-4 p-4 bg-slate-50 border rounded-2xl">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm">
                {icon}
            </div>

            <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase">{label}</p>

                {editable ? (
                    <input
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border rounded-lg"
                    />
                ) : (
                    <p className="font-semibold text-slate-700">{value || "-"}</p>
                )}
            </div>
        </div>
    );
}