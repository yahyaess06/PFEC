import React, { useEffect, useState } from "react";
import {
    FaCalendarCheck,
    FaClock,
    FaHistory,
    FaRegTimesCircle,
} from "react-icons/fa";
import {anulerRdv, getRdvs, voireRdv, voireVaccin, voireVaccinDetails} from "../../services/rdvService.js";
import { FiX } from "react-icons/fi";
import {getPatientProfile} from "../../services/patientService.js";

const MesRendezVous = () => {
    const [activeTab, setActiveTab] = useState("À venir");
    const [Rdvs, setRdvs] = useState([]);
    const [rdvVaccin, setRdvVaccin] = useState([]);
    const [btnvaccin, setbtnvaccin] = useState(false);

    const [contactm7lol, setcontactm7lol] = useState(false);
    const [rdvdetail, setRdvdetail] = useState({});
    const primaryGreen = "#2ecc71";

    const afficherrdvs = async () => {
        try {
            const res = await getRdvs();
            setRdvs(res.data);
        } catch (err) {
            console.error("Erreur chargement rdvs", err);
        }
    };

    useEffect(() => {
        afficherrdvs();
        afficherdonneePatient();
    }, []);

    const an = async (id) => {
        try {
            await anulerRdv(id);
            // afficherrdvs();
            if(btnvaccin){
                await voirerdvVaccin();
            }else {
                await afficherrdvs();
            }
        } catch (err) {
            console.error("Erreur annulation", err);
        }
    };

    const voirevaccindetails =async (id) => {
        try{
            setIsGenycology(false);
            const res=await voireVaccinDetails(id)
            console.log("eho",res.data);
            setRdvdetail(res.data);
            setIsInfermier(true)
        }catch (err) {
            console.error(err);
        }
    }

    const [isgenycology,setIsGenycology]=useState(false);
const [isinfermier,setIsInfermier]=useState(false);

    const voireRdvDetails = async (id,specialite) => {
        try {
            setIsInfermier(false)
            setIsGenycology(specialite === "Gynécologie");
            const res = await voireRdv(id);
            console.log(res.data);
            setRdvdetail(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const voirerdvVaccin = async () => {
        try {
            const res = await voireVaccin();
            setRdvVaccin(res.data);
            setbtnvaccin(true);
            setIsInfermier(true)
        } catch (err) {
            console.error(err);
        }
    };

    const voirerdvsimple = async () => {
        setbtnvaccin(false);
        await afficherrdvs();
    };

    const contactformm7lol = () => setcontactm7lol(true);
    const contactformmsdod = () => setcontactm7lol(false);

    const dataToShow = btnvaccin ? rdvVaccin : Rdvs;

    const filteredRdvs = dataToShow.filter((rdv) => {
        if (activeTab === "À venir") return rdv.staus === "Valide";
        if (activeTab === "Passés") return rdv.staus === "Terminer";
        if (activeTab === "Annulés") return rdv.staus === "anullee";
        return true;
    });

    const countValide = dataToShow.filter((r) => r.staus === "Valide").length;
    const countTermine = dataToShow.filter((r) => r.staus === "Terminer").length;
    const countAnnule = dataToShow.filter((r) => r.staus === "anullee").length;

    const statusLabel = (s) => {
        if (s === "Valide") return "Validé";
        if (s === "Terminer") return "Terminé";
        return "Annulé";
    };

    const statusPill = (s) => {
        if (s === "Valide") return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
        if (s === "Terminer") return "bg-slate-50 text-slate-700 ring-1 ring-slate-200";
        return "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
    };

    const tabClass = (tab) =>
        `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition
     ${
            activeTab === tab
                ? "bg-slate-900 text-white shadow"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
        }`;

    const chipClass = (active) =>
        `rounded-full px-4 py-2 text-sm font-semibold transition
     ${
            active
                ? "bg-emerald-600 text-white shadow hover:bg-emerald-700"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
        }`;

    const emptyMessage = () => {
        if (activeTab === "Annulés") return "Aucun RDV annulé.";
        if (activeTab === "Passés") return "Y'a pas de RDV terminé.";
        return "Aucun rendez-vous disponible pour le moment.";
    };


    const[isfemale,setIsfemale]=useState(false);
    const afficherdonneePatient = async ()=>{
        try {
            const res=await getPatientProfile()
            let sexe=res.data.sexe;
            if (sexe === "female"){
                setIsfemale(true)
            }
        }catch (err){
            console.error(err);
        }};

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-6xl px-4 py-8">
                {/* Header */}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                  <FaCalendarCheck size={22} style={{ color: primaryGreen }} />
                </span>
                                Mes Rendez-vous
                            </h1>
                            <p className="mt-1 text-sm text-slate-600">
                                Gérez et consultez tous vos rendez-vous
                            </p>
                        </div>

                        <div className="hidden sm:flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {btnvaccin ? "Vaccin" : "Simple"}
              </span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        <button className={tabClass("À venir")} onClick={() => setActiveTab("À venir")}>
                            <FaClock size={14} />
                            À venir <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{countValide}</span>
                        </button>

                        <button className={tabClass("Passés")} onClick={() => setActiveTab("Passés")}>
                            <FaHistory size={14} />
                            Passés <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{countTermine}</span>
                        </button>

                        <button className={tabClass("Annulés")} onClick={() => setActiveTab("Annulés")}>
                            <FaRegTimesCircle size={14} />
                            Annulés <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{countAnnule}</span>
                        </button>
                    </div>

                    {/* Switch simple/vaccin */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        <button onClick={voirerdvVaccin} className={chipClass(btnvaccin)}>
                             Vaccin
                        </button>

                        <button onClick={voirerdvsimple} className={chipClass(!btnvaccin)}>
                            Consultation simple
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                            <tr>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                                    Date
                                </th>

                                {btnvaccin ? (
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Infirmier
                                    </th>
                                ) : (
                                    <>
                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                                            Docteur
                                        </th>
                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                                            Spécialité
                                        </th>
                                    </>
                                )}

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                                    Motif
                                </th>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                                    Statut
                                </th>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                                    Actions
                                </th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 bg-white">
                            {filteredRdvs.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={btnvaccin ? 5 : 6}
                                        className="px-5 py-10 text-center text-sm text-slate-500"
                                    >
                                        {emptyMessage()}
                                    </td>
                                </tr>
                            ) : (
                                filteredRdvs.filter((rdv) => isfemale || rdv.docSpecialite !== "Gynécologie")
                                    .map((rdv) => (
                                    <tr key={rdv.id} className="hover:bg-slate-50 transition">
                                        <td className="px-5 py-4 text-sm font-medium text-slate-900">
                                            {new Date(rdv.date_rendez_vous).toLocaleDateString()}
                                        </td>

                                        {btnvaccin ? (
                                            <td className="px-5 py-4 text-sm text-slate-700">
                                                {rdv.nomInfermier}
                                            </td>
                                        ) : (
                                            <>
                                                <td className="px-5 py-4 text-sm text-slate-700">{rdv.nomfdoc}</td>
                                                <td className="px-5 py-4 text-sm text-slate-700">{rdv.docSpecialite}</td>
                                            </>
                                        )}

                                        <td className="px-5 py-4 text-sm text-slate-700">
                                            {rdv.description}
                                        </td>

                                        <td className="px-5 py-4">
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${statusPill(
                                rdv.staus
                            )}`}
                        >
                          {statusLabel(rdv.staus)}
                        </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex flex-wrap items-center gap-2">
                                                {btnvaccin ? (
                                                    <button
                                                        onClick={() => {
                                                            contactformm7lol();
                                                            voirevaccindetails(rdv.id,rdv.docSpecialite);
                                                        }}
                                                        className="inline-flex items-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-slate-800 active:scale-[0.99] transition"
                                                    >
                                                        Voir details vaccin
                                                    </button>
                                                ) : rdv.docSpecialite ==="Gynécologie"?(
                                                        <button
                                                            onClick={() => {
                                                                contactformm7lol();
                                                                voireRdvDetails(rdv.id,rdv.docSpecialite);
                                                            }}
                                                            className="inline-flex items-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-slate-800 active:scale-[0.99] transition"
                                                        >
                                                            Voir details de grossess
                                                        </button>
                                                    ) : (
                                                    <button
                                                        onClick={() => {
                                                            contactformm7lol();
                                                            voireRdvDetails(rdv.id);
                                                        }}
                                                        className="inline-flex items-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-slate-800 active:scale-[0.99] transition"
                                                    >
                                                        Voir
                                                    </button>
                                                )}

                                                {rdv.staus === "Valide" && (
                                                    <button
                                                        className="inline-flex items-center rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-rose-700 active:scale-[0.99] transition"
                                                        onClick={() => an(rdv.id)}
                                                    >
                                                        Annuler
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal détails */}
                {contactm7lol && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                            onClick={contactformmsdod}
                        />

                        <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
                            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                                <h2 className="text-base font-bold text-slate-900">
                                    Détails du rendez-vous
                                </h2>

                                <button
                                    onClick={contactformmsdod}
                                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                                    aria-label="Fermer"
                                >
                                    <FiX className="h-5 w-5"/>
                                </button>
                            </div>

                            <div className="px-5 py-5">
                                {/* Num RDV dans un cercle */}
                                <div className="flex justify-center mb-5">
                                    <div className="flex flex-col items-center">
                                        {isfemale && isgenycology ? (
                                            <>
                                                <div
                                                    className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-base font-bold">
                                                    {rdvdetail?.nbMoins}
                                                </div>
                                            <div className="mt-2 text-xs text-slate-500 font-semibold">
                                                Nombre de moie de grosess
                                            </div></>
                                        ) : (<>
                                            <div
                                            className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-base font-bold">
                                        {rdvdetail?.numeroPatient}
                                    </div>
                                    <div className="mt-2 text-xs text-slate-500 font-semibold">
                                        Numéro RDV
                                    </div></>)
                                    }
                                </div>
                            </div>

                            {/* Infos en lignes simples */}
                            <div className="space-y-3">
                                    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                                        <span className="text-slate-500 font-semibold">Date</span>
                                        <span className="text-slate-800 font-medium">

                                            {rdvdetail?.date ? new Date(rdvdetail.date).toLocaleDateString() : "-"}
      </span>
                                    </div>

                                    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                                        <span className="text-slate-500 font-semibold">Période</span>
                                        <span className="text-slate-800 font-medium capitalize">
        {rdvdetail?.period || "-"}
      </span>
                                    </div>

                                    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                                        <span className="text-slate-500 font-semibold">Patient</span>
                                        <span className="text-slate-800 font-medium">
        {rdvdetail?.nomPatient} {rdvdetail?.prenomPatient}
      </span>
                                    </div>

                                    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                                        <span className="text-slate-500 font-semibold">Hôpital</span>
                                        <span className="text-slate-800 font-medium">
        {rdvdetail?.nomHopital || "-"}
      </span>
                                    </div>

                                    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                                        <span className="text-slate-500 font-semibold">Adresse</span>
                                        <span className="text-slate-800 font-medium text-right">
        {rdvdetail?.adresseHopital || "-"}
      </span>
                                    </div>
                                {isinfermier ? (
                                    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                                        <span className="text-slate-500 font-semibold">Infirmier</span>
                                        <span className="text-slate-800 font-medium">
      {rdvdetail?.prenomInfermier} {rdvdetail?.nomInfermier}
    </span>
                                    </div>
                                ) : (
                                    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                                        <span className="text-slate-500 font-semibold">Docteur</span>
                                        <span className="text-slate-800 font-medium">
      {rdvdetail?.prenomDoc} {rdvdetail?.nomDoc}
    </span>
                                    </div>
                                )}


                                <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                                        <span className="text-slate-500 font-semibold">Statut</span>
                                        <span className="text-slate-800 font-medium">
        {rdvdetail?.status || "-"}
      </span>
                                    </div>

                                    <div className="pt-1">
                                        <div className="text-slate-500 font-semibold mb-1">Description</div>
                                        <div
                                            className="text-slate-800 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl">
                                            {rdvdetail?.description || "-"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end px-5 pb-5">
                                <button
                                    onClick={contactformmsdod}
                                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MesRendezVous;
