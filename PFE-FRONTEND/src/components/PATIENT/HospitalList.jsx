import React, { useState, useEffect } from "react";
import { MapPin, ArrowRight, Building2, Heart, Shield, Baby } from "lucide-react"; // Ajout de Baby
import { useNavigate } from "react-router-dom";
import { voireHopital } from "../../services/HopitauxService.js";
import { FiX } from "react-icons/fi";
import {getPatientProfile} from "../../services/patientService.js";

export default function MoroccanHospitalNetwork() {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHopId, setSelectedHopId] = useState(null);

    const navigate = useNavigate();

    const regions = [
        { id: "CASABLANCA_SETAT", nom: "Casablanca-Settat" },
        { id: "RABAT_SALE_KENITRA", nom: "Rabat-Salé-Kénitra" },
        { id: "MARRAKECH_SAFI", nom: "Marrakech-Safi" },
        { id: "TANGER_TETOUAN_AL_HOCEIMA", nom: "Tanger-Tétouan" },
        { id: "L_ORIENTAL", nom: "L'Oriental" },
        { id: "FES_MEKNES", nom: "Fès-Meknès" },
        { id: "BENI_MELLAL_KHENIFRA", nom: "Béni Mellal" },
        { id: "DRAA_TAFILALET", nom: "Drâa-Tafilalet" },
        { id: "SOUSS_MASSA", nom: "Souss-Massa" },
        { id: "GUELMIM_OUED_NOUN", nom: "Guelmim" },
        { id: "LAAYOUNE_SAKIA_EL_HAMRA", nom: "Laâyoune" },
        { id: "DAKHLA_OUED_ED_DAHAB", nom: "Dakhla" }
    ];

    const fetchHospitals = async (regionId) => {
        try {
            const res = await voireHopital(regionId);
            setHospitals(res.data);
        } catch (error) {
            console.error("Erreur chargement hôpitaux", error);
        }
    };

    useEffect(() => {
        setSelectedRegion(regions[0].id);
        fetchHospitals(regions[0].id);
    }, []);

    const openRdvModal = (id) => {
        setSelectedHopId(id);
        setIsModalOpen(true);
    };

    const handleNavigation = (path) => {
        navigate(path, { state: { idhop: selectedHopId } });
        setIsModalOpen(false);
    };

    const[isfemale,setIsfemale]=useState(false);
    const afficherdonneePatient = async ()=>{
        try {
            const res=await getPatientProfile()
            let sexe=res.data.sexe;
            if (sexe == "female"){
                setIsfemale(true)
            }
        }catch (err){
            console.error(err);
        }};


    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <div className="bg-white border-b border-slate-100 p-6 text-center">
                <h1 className="text-3xl font-black text-slate-900">Réseau Hospitalier Marocain</h1>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Sélecteur de Régions */}
                <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
                    {regions.map(region => (
                        <button
                            key={region.id}
                            onClick={() => { setSelectedRegion(region.id); fetchHospitals(region.id); }}
                            className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold border transition-all
                                ${selectedRegion === region.id ? "bg-slate-900 text-white shadow-lg" : "bg-white text-slate-600 hover:border-emerald-500"}`}
                        >
                            {region.nom}
                        </button>
                    ))}
                </div>

                {/* Liste des Hôpitaux */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {hospitals.map(hop => (
                        <div key={hop.id_hopital} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                            <Building2 className="text-emerald-500 mb-4" size={32} />
                            <h3 className="text-lg font-bold mb-2">{hop.nom_hopital}</h3>
                            <p className="text-sm text-slate-400 mb-6 flex items-center gap-2 italic"><MapPin size={14}/> {hop.email}</p>
                            <button
                                onClick={() => {afficherdonneePatient(),openRdvModal(hop.id_hopital)}}
                                className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase hover:bg-emerald-600 transition"
                            >
                                Choisir cet établissement
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal de sélection de type de RDV */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 relative animate-in zoom-in">
                        <button onClick={() => setIsModalOpen(false)} className="absolute right-8 top-8 text-slate-400 hover:text-slate-900"><FiX size={24}/></button>
                        <h2 className="text-2xl font-black mb-6">Type de rendez-vous</h2>

                        <div className="space-y-4">
                            <RdvOption
                                icon={<Heart className="text-emerald-500"/>}
                                title="Consultation Simple"
                                description="Médecine générale et spécialistes"
                                onClick={() => handleNavigation("/patient/prendre-rdv")}
                                color="emerald"
                            />
                            <RdvOption
                                icon={<Shield className="text-rose-500"/>}
                                title="Vaccination"
                                description="Programme national d'immunisation"
                                onClick={() => handleNavigation("/patient/vaccination")}
                                color="rose"
                            />
                            {/* NOUVELLE OPTION : MATERNITÉ */}
                            {isfemale
                                &&

                            <RdvOption
                                icon={<Baby className="text-blue-500"/>}
                                title="Suivi Grossesse"
                                description="Consultation prénatale et Echo"
                                onClick={() => handleNavigation("/patient/maternite")}
                                color="blue"
                            />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function RdvOption({ icon, title, description, onClick, color }) {
    const colors = {
        emerald: "hover:bg-emerald-50",
        rose: "hover:bg-rose-50",
        blue: "hover:bg-blue-50"
    };
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 transition-all text-left ${colors[color]}`}>
            <div className="p-3 bg-white rounded-xl shadow-sm">{icon}</div>
            <div>
                <p className="font-bold text-slate-900">{title}</p>
                <p className="text-xs text-slate-500">{description}</p>
            </div>
            <ArrowRight size={16} className="ml-auto text-slate-300" />
        </button>
    );
}