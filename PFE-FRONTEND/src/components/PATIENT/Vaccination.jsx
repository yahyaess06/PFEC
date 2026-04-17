import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
    Shield,
    Calendar,
    Info,
    CheckCircle2,
    ArrowLeft,
    Syringe,
    Clock,
    FileText,
} from "lucide-react";
import { idPatient } from "../../services/authService.js";
import Sidebar from "./Sidebar";
import { prdrdvVaccin } from "../../services/rdvService.js";

export default function Vaccination() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const idhopital = state?.idhop;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // ✅ On garde "period" (comme ton code initial) car c'est sûrement ce que l'API attend
    const [formData, setFormData] = useState({
        date: "",
        period: "matin",
        description: "",
        hopitalId: idhopital ?? "",
        patientId: idPatient(),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            console.log("SEND =>", formData); // 👈 vérifie ici que period ≠ null
            await prdrdvVaccin(formData);

            setTimeout(() => {
                setIsSubmitting(false);
                setShowSuccess(true);
            }, 800);
        } catch (error) {
            setIsSubmitting(false);
            alert("Erreur lors de la réservation");
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            <div className="w-64 fixed inset-y-0 z-50">
                <Sidebar />
            </div>

            <main className="flex-1 ml-64 p-8">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 mb-8 hover:text-emerald-600 transition font-semibold group"
                    >
                        <ArrowLeft
                            size={20}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        Retour au réseau hospitalier
                    </button>

                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 overflow-hidden border border-slate-100">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-10 text-white relative">
                            <div className="relative z-10">
                                <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                                    <Syringe size={32} /> Service de Vaccination
                                </h1>
                            </div>
                            <Shield
                                size={140}
                                className="absolute -right-6 -bottom-6 text-white opacity-10 rotate-12"
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Calendar size={16} className="text-emerald-500" /> Date du
                                        rendez-vous
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        required
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-4 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none border transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Clock size={16} className="text-emerald-500" /> Moment de la
                                        journée
                                    </label>

                                    <div className="grid grid-cols-2 gap-3">
                                        {["matin", "apres-midi"].map((p) => (
                                            <button
                                                key={p}
                                                type="button"
                                                onClick={() =>
                                                    setFormData((prev) => ({ ...prev, period: p }))
                                                }
                                                className={`py-4 rounded-2xl border font-bold transition-all capitalize
                          ${
                                                    formData.period === p
                                                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                                                        : "border-slate-100 bg-slate-50 text-slate-400 hover:border-emerald-200"
                                                }
                        `}
                                            >
                                                {p === "apres-midi" ? "Après-midi" : "Matin"}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <FileText size={16} className="text-emerald-500" /> Description
                                    de vaccin
                                </label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Decrire votre cas..."
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-4 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none border transition-all font-medium resize-none"
                                />
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-6 flex gap-4 border border-slate-200 shadow-sm">
                                <Info className="text-emerald-500 shrink-0" size={24} />
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  <span className="text-slate-900 font-bold block mb-1 underline">
                    Rappel important :
                  </span>
                                    Veuillez vous présenter 15 minutes avant votre rendez-vous muni
                                    de votre carnet de santé et de votre pièce d'identité.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl transition-all flex items-center justify-center gap-3
                  ${
                                    isSubmitting
                                        ? "bg-slate-300"
                                        : "bg-slate-900 hover:bg-emerald-600 shadow-emerald-100"
                                }
                `}
                            >
                                {isSubmitting ? "Traitement..." : "Confirmer le rendez-vous"}
                                <CheckCircle2 size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            {showSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-sm p-10 text-center shadow-2xl border border-slate-50">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">
                            C'est confirmé !
                        </h2>
                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            Votre rendez-vous pour le{" "}
                            <span className="font-bold text-emerald-600">{formData.date}</span>{" "}
                            a été enregistré avec succès.
                        </p>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg"
                        >
                            Terminer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
