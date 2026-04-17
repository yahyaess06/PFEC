import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Baby,
    Calendar,
    Info,
    CheckCircle2,
    ArrowLeft,
    FileText,
    AlertCircle,
    Activity,
    Clock
} from "lucide-react";
import { idPatient } from "../../services/authService.js";
import Sidebar from "./Sidebar";


import axios from "axios";

// import { prdrdvMaternite } from "../../services/rdvService.js";

export default function MaternitePage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const idhopital = state?.idhop;

    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [showSuccess, setShowSuccess] = useState(false);
    const [modal, setModal] = useState(null);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        date: "",
        //periode: "matin",
        periode: "",
        moisGrossesse: "1",
        // aMaladie: "non",
        //maladieDescription: "",
        descriptionObservations: "",
        hopitalId: idhopital ?? "",
        patientId: idPatient()
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // const dto = {
            //             //     date: formData.date,
            //             //     hopitalId: formData.hopitalId,
            //             //     patientId: formData.patientId,
            //             //     nbMoins: Number(formData.moisGrossesse),
            //             //     question: formData.aMaladie === "oui",
            //             //     description: formData.descriptionObservations,
            //             //     periode: Number(formData.moisGrossesse) >= 8 ? null : formData.periode
            //             //
            //             // };
            const dto = {
                date: formData.date,
                hopitalId: formData.hopitalId,
                patientId: formData.patientId,
                nbMoins: Number(formData.moisGrossesse),
                // question: formData.aMaladie === "oui",
                description: formData.descriptionObservations,
                periode: formData.periode
            };

            await axios.post(
                "http://localhost:9090/patient/rdv/enseinte",
                dto, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            // setShowSuccess(true);
            setModal({type: "success"});
        } catch (error) {
            console.error(error);
            //alert("Erreur lors de la réservation");
            // setModal({ type: "error" });
            const message = error.response?.data?.message || error.response?.data || "une erreur est survenue";
            setModal({
                type: "error",
                message: message
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Sidebar fixe à gauche */}
            <div className="w-64 fixed inset-y-0 z-50">
                <Sidebar />
            </div>

            <main className="flex-1 ml-64 p-8">
                <div className="max-w-4xl mx-auto">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 mb-8 hover:text-rose-600 transition font-semibold group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Retour au réseau hospitalier
                    </button>

                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 overflow-hidden border border-slate-100">

                        {/* Header thématique */}
                        <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-10 text-white relative">
                            <div className="relative z-10">
                                <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                                    <Baby size={32} /> Suivi de Grossesse
                                </h1>

                            </div>
                            <Baby size={140} className="absolute -right-6 -bottom-6 text-white opacity-10 rotate-12" />
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 space-y-8">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Date du rendez-vous */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Calendar size={16} className="text-rose-500"/> Date souhaitée
                                    </label>
                                    {/*<input
                                        type="date"
                                        name="date"
                                        required
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-4 focus:ring-4 focus:ring-rose-100 focus:border-rose-500 outline-none border transition-all font-medium"
                                    />*/}
                                    <input
                                        type="date"
                                        name="date"
                                        min={minDate}
                                        required
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-4 focus:ring-4 focus:ring-rose-100 focus:border-rose-500 outline-none border transition-all font-medium"
                                    />
                                    <p className="text-xs text-slate-400">
                                        Les rendez-vous sont disponibles à partir de demain.
                                    </p>
                                </div>

                                {/* Nombre de mois */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Activity size={16} className="text-rose-500"/> Mois de grossesse
                                    </label>
                                    <select
                                        name="moisGrossesse"
                                        value={formData.moisGrossesse}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-4 focus:ring-4 focus:ring-rose-100 focus:border-rose-500 outline-none border transition-all font-medium appearance-none"
                                    >
                                        {[...Array(9)].map((_, i) => (
                                            <option key={i+1} value={i+1}>{i+1} mois</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Période */}
                            <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                                <label className="text-sm font-semibold text-slate-700 block">
                                    Moment de la journée
                                </label>

                                <div className="flex gap-4">
                                    {['MATIN', 'APRES_MIDI'].map((p) => (
                                        <label
                                            key={p}
                                            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer border-2 transition-all
                                                    ${
                                                formData.periode === p
                                                    ? "bg-rose-600 border-rose-600 text-white"
                                                    : "bg-white border-slate-100 text-slate-600 hover:border-rose-200"
                                            }
                                                `}
                                                         >
                                            <input
                                                type="radio"
                                                name="periode"
                                                value={p}
                                                checked={formData.periode === p}
                                                onChange={handleChange}
                                                disabled={false}
                                                className="hidden"
                                            />
                                            <span className="font-medium">
                                                    {p === 'MATIN' ? '☀️ Matin' : '🌤️ Après-midi'}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>


                            {/*/!* Question Maladie Chronique *!/*/}
                            {/*<div className="space-y-4">*/}
                            {/*    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">*/}
                            {/*        <AlertCircle size={16} className="text-rose-500"/> Avez-vous une maladie ou un antécédent médical ?*/}
                            {/*    </label>*/}
                            {/*    <div className="flex gap-4">*/}
                            {/*        {["oui", "non"].map((option) => (*/}
                            {/*            <button*/}
                            {/*                key={option}*/}
                            {/*                type="button"*/}
                            {/*                onClick={() => setFormData({...formData, aMaladie: option})}*/}
                            {/*                className={`flex-1 py-4 rounded-2xl border font-bold transition-all uppercase text-sm*/}
                            {/*                    ${formData.aMaladie === option*/}
                            {/*                    ? "border-rose-500 bg-rose-50 text-rose-700 shadow-sm"*/}
                            {/*                    : "border-slate-100 bg-slate-50 text-slate-400 hover:border-rose-200"}*/}
                            {/*                `}*/}
                            {/*            >*/}
                            {/*                {option}*/}
                            {/*            </button>*/}
                            {/*        ))}*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/* Description de la maladie (si Oui) */}
                            {/*{formData.aMaladie === "oui" && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                                    <label className="text-sm font-bold text-slate-700">Détails de la maladie</label>
                                    <textarea
                                        name="maladieDescription"
                                        rows="2"
                                        value={formData.maladieDescription}
                                        onChange={handleChange}
                                        placeholder="Veuillez préciser la maladie..."
                                        className="w-full rounded-2xl border-rose-200 bg-rose-50/30 px-5 py-4 focus:ring-4 focus:ring-rose-100 focus:border-rose-500 outline-none border transition-all font-medium"
                                    ></textarea>
                                </div>
                            )}*/}

                            {/* Description Générale / Symptômes */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <FileText size={16} className="text-rose-500"/> Description de votre état
                                </label>
                                <textarea
                                    name="descriptionObservations"
                                    rows="4"
                                    value={formData.descriptionObservations}
                                    onChange={handleChange}
                                    placeholder="Décrivez comment vous vous sentez ou vos questions pour le médecin..."
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-4 focus:ring-4 focus:ring-rose-100 focus:border-rose-500 outline-none border transition-all font-medium resize-none"
                                ></textarea>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-6 flex gap-4 border border-slate-200">
                                <Info className="text-rose-500 shrink-0" size={24} />
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                    <span className="text-slate-900 font-bold block mb-1 underline">Rappel :</span>
                                    Munissez-vous de vos derniers bilans biologiques et échographies lors de votre visite.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl transition-all flex items-center justify-center gap-3
                                    ${isSubmitting ? "bg-slate-300" : "bg-slate-900 hover:bg-rose-600 shadow-rose-100"}
                                `}
                            >
                                {isSubmitting ? "Envoi..." : "Confirmer le rendez-vous de suivi"}
                                <CheckCircle2 size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            {/* Modal de Confirmation */}
            {modal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-sm p-10 text-center shadow-2xl border border-slate-50">

                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6
        ${modal.type === "success"
                            ? "bg-rose-50 text-rose-500"
                            : "bg-red-50 text-red-500"}
      `}>
                            {modal.type === "success" ? (
                                <CheckCircle2 size={40} />
                            ) : (
                                <AlertCircle size={40} />
                            )}
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 mb-2">
                            {modal.type === "success" ? "C'est validé !" : "Erreur"}
                        </h2>

                        {/*<p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            {modal.type === "success"
                                ? <>Votre rendez-vous pour votre <span className="font-bold text-rose-600">mois {formData.moisGrossesse}</span> est enregistré.</>
                                : "Créneau indisponible ou période non valide."}
                        </p>*/}
                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            {modal.type === "success"
                                ? (
                                    <>
                                        Votre rendez-vous pour votre
                                        <span className="font-bold text-rose-600">
                                            {" "}mois {formData.moisGrossesse}
                                        </span>
                                        {" "}est enregistré.
                                                 </>
                                            )
                                            : modal.message}
                        </p>

                        <button
                            onClick={() => setModal(null)}
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg"
                        >
                            Terminer
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}