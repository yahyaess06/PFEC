import { useLocation, useNavigate } from "react-router-dom"; // Ajout de useNavigate
import React, { useEffect, useState } from "react";
import {
    FaCalendarPlus,
    FaSearch,
    FaCheck,
    FaClock,
    FaCalendarTimes,
    FaBell,
    FaStethoscope,
    FaRegEdit,
    FaArrowLeft // Ajout de l'icône de retour
} from "react-icons/fa";
import { FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { getAllSpecialities } from "../../services/specService.js";
import { prdvsimple } from "../../services/prdvSimpleService.js";
import { idPatient } from "../../services/authService.js";

const PrendreRDV = () => {
    const { state } = useLocation();
    const navigate = useNavigate(); // Initialisation du hook de navigation
    const idhopital = state?.idhop;

    const [contactm7lol, setcontactm7lol] = useState(false);
    const [spec, setSpec] = useState([]);
    const [substate, setSubState] = useState(null);

    const [prdvdto, setprdvdto] = useState({
        date: "",
        specialite: "",
        periode: "",
        desciption: "",
        idHopital: idhopital ?? "",
        patientId: Number(idPatient())
    });

    useEffect(() => {
        const voireSpecs = async () => {
            try {
                const res = await getAllSpecialities();
                setSpec(res.data);
            } catch (error) {
                console.error("Erreur specs:", error);
            }
        };
        voireSpecs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setprdvdto(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await prdvsimple(prdvdto);
            setSubState("shih");
            setcontactm7lol(true);
            // afficherdonneePatient();
        } catch (error) {
            setSubState("ghalet");
            setcontactm7lol(true);
        }
    };



    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* --- Header Section --- */}
            <div className="bg-white border-b border-slate-200 mb-8">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    {/* Bouton Retour */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors mb-6 group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Retour au réseau hospitalier
                    </button>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl mb-4">
                            <FaCalendarPlus size={32} className="text-emerald-600" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Prendre un Rendez-vous
                        </h1>
                        <p className="mt-2 text-slate-600 max-w-md mx-auto">
                            Réservez votre consultation en quelques clics auprès de nos spécialistes.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* --- Formulaire (Col 1 & 2) --- */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                            <FaSearch className="text-emerald-600" />
                            <h2 className="text-xl font-bold text-slate-800">Détails de la visite</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <FaCalendarTimes className="text-slate-400" size={14}/>
                                    Date souhaitée
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={prdvdto.date}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none border"
                                />
                            </div>

                            {/* Spécialité */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <FaStethoscope className="text-slate-400" size={14}/>
                                    Spécialité
                                </label>
                                <select
                                    name="specialite"
                                    value={prdvdto.specialite}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none border"
                                >
                                    <option value="">Choisir une spécialité</option>
                                    {spec
                                        .filter(
                                        spec=>spec.nomspec!=="Gynécologie"
                                    )
                                        .map((s) => (
                                        <option key={s.nomspec} value={s.nomspec}>{s.nomspec}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Période */}
                            <div className="md:col-span-2 space-y-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                                <label className="text-sm font-semibold text-slate-700 block">Moment de la journée</label>
                                <div className="flex gap-4">
                                    {['MATIN', 'APRES_MIDI'].map((p) => (
                                        <label key={p} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer border-2 transition-all ${prdvdto.periode === p ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-100 text-slate-600 hover:border-emerald-200'}`}>
                                            <input
                                                type="radio"
                                                name="periode"
                                                value={p}
                                                checked={prdvdto.periode === p}
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                            <span className="font-medium">{p === 'MATIN' ? '☀️ Matin' : '🌤️ Après-midi'}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <FaRegEdit className="text-slate-400" size={14}/>
                                    Motif (Optionnel)
                                </label>
                                <textarea
                                    rows="3"
                                    name="desciption"
                                    value={prdvdto.desciption}
                                    onChange={handleChange}
                                    placeholder="Expliquez brièvement l'objet de votre visite..."
                                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none border resize-none"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="mt-8 w-full flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 text-white font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all"
                        >
                            <FaCheck />
                            Confirmer la demande de rendez-vous
                        </button>
                    </div>
                </div>

                {/* --- Sidebar Info (Col 3) --- */}
                <div className="space-y-4">
                    <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl">
                        <div className="flex items-center gap-2 mb-6">
                            <FaClock className="text-emerald-400" />
                            <h3 className="font-bold text-lg">Infos Pratiques</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="text-emerald-400 mt-1"><FaClock size={18}/></div>
                                <div>
                                    <p className="font-semibold text-sm">Durée moyenne</p>
                                    <p className="text-slate-400 text-xs text-balance">Les consultations durent environ 30 minutes.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-emerald-400 mt-1"><FaCalendarTimes size={18}/></div>
                                <div>
                                    <p className="font-semibold text-sm">Annulation gratuite</p>
                                    <p className="text-slate-400 text-xs text-balance">Possible jusqu'à 24h avant l'heure du RDV.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-emerald-400 mt-1"><FaBell size={18}/></div>
                                <div>
                                    <p className="font-semibold text-sm">Rappels automatiques</p>
                                    <p className="text-slate-400 text-xs text-balance">Vous recevrez un SMS de rappel la veille.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100 text-emerald-800 text-sm italic">
                        "Votre santé est notre priorité. Nos médecins s'engagent à vous recevoir dans les meilleurs délais."
                    </div>
                </div>
            </div>

            {/* --- Modal de Confirmation --- */}
            {contactm7lol && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl text-center scale-up-center">
                        <button
                            onClick={() => setcontactm7lol(false)}
                            className="absolute right-6 top-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <FiX size={20} className="text-slate-400" />
                        </button>

                        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${substate === "shih" ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                            {substate === "shih" ? <FiCheckCircle size={40} /> : <FiAlertCircle size={40} />}
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                            {substate === "shih" ? "Demande envoyée !" : "Une erreur est survenue"}
                        </h2>

                        <p className="text-slate-500 mb-8 px-4 leading-relaxed">
                            {substate === "shih"
                                ? "Votre demande de rendez-vous a bien été enregistrée. Vous recevrez une confirmation bientôt."
                                : "L'établissement est complet pour cette période ou le médecin est indisponible."}
                        </p>

                        <button
                            onClick={() => setcontactm7lol(false)}
                            className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${substate === "shih" ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' : 'bg-slate-800 hover:bg-slate-900 shadow-slate-200'}`}
                        >
                            Compris
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrendreRDV;