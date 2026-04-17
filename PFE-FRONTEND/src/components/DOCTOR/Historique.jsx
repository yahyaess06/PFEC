import React, { useEffect, useState } from 'react';
import styles from './Historique.module.css';
import { Search, ChevronRight } from 'lucide-react';
import {
  FaHistory,
  FaAllergies,
  FaPrescriptionBottleAlt,
  FaTint,
  FaCalendarCheck,
  FaFileMedical
} from 'react-icons/fa';
import { voirePatient } from "../../services/patientService.js";
import { getDossier } from "../../services/HistoriqueService.js";

const primaryGreen = '#2ecc71';

const SummaryCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition">
      <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: color }}
      >
        <Icon size={22} color="white" />
      </div>

      <div className="min-w-0">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-base font-semibold text-gray-800 truncate">
          {value || "—"}
        </h3>
      </div>
    </div>
);

const Historique = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [tPage, settPage] = useState(0);
  const [patients, setPatients] = useState([]);

  const [contactm7lol, setcontactm7lol] = useState(false);
  const contactformm7lol = () => setcontactm7lol(true);
  const contactformmsdod = () => setcontactm7lol(false);

  const [cinounom, setcinounom] = useState(true);
  const [searchMed, setSearchMed] = useState("");
  const [searchCin, setSearchCin] = useState("");

  const [dossier, setDossier] = useState({});

  const voirePatientParRegions = async () => {
    try {
      const res = await voirePatient(currentPage, searchMed, searchCin);
      console.log(res.data);
      setPatients(res.data.patients || []);
      settPage(res.data.totalPages || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const voireDataDossier = async (id) => {
    try {
      const res = await getDossier(id);
      console.log(res.data);
      setDossier(res.data || {});
    } catch (err) {
      console.error(err);
    }
  };

  const setPrecedant = (c) => {
    if (c > 0) {
      setCurrentPage(c - 1);
    }
  };

  const setSuivant = (c) => {
    if (c < tPage - 1) {
      setCurrentPage(c + 1);
    }
  };

  useEffect(() => {
    voirePatientParRegions();
  }, [currentPage, searchMed, searchCin]);

  return (
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1>Historique des Patients</h1>
            <p>Consultez et gérez les archives médicales de votre cabinet.</p>
          </div>
        </header>

        {/* Barre de recherche */}
        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} size={20} />
            <input
                type="text"
                value={cinounom ? (searchMed ?? "") : (searchCin ?? "")}
                onChange={(e) => {
                  if (cinounom) {
                    setSearchMed(e.target.value);
                    setSearchCin("");
                  } else {
                    setSearchCin(e.target.value);
                    setSearchMed("");
                  }
                  setCurrentPage(0);
                }}
                placeholder={
                  cinounom
                      ? "Rechercher par nom..."
                      : "Rechercher par CIN..."
                }
            />

            <button
                onClick={() => {
                  setcinounom(!cinounom);
                  setSearchMed("");
                  setSearchCin("");
                  setCurrentPage(0);
                }}
                className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-sm"
            >
              {cinounom ? "Recherche par nom" : "Recherche par CIN"}
            </button>
          </div>
        </div>

        {/* Liste des patients */}
        <div className={styles.tableWrapper}>
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-4 py-2">Patient</th>
              <th className="px-4 py-2">CIN</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
            </thead>

            <tbody>
            {patients.map((doc) => (
                <tr
                    key={doc.id}
                    className="bg-white shadow-sm ring-1 ring-gray-100 hover:shadow-md transition rounded-xl"
                >
                  <td className="px-4 py-3 rounded-l-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                        {doc?.nom?.charAt(0) ?? "?"}
                      </div>

                      <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {doc.nom} {doc.prenom}
                      </span>
                        <span className="text-xs text-gray-500">
                        ID: {doc.id}
                      </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-200">
                    {doc.cin}
                  </span>
                  </td>

                  <td className="px-4 py-3 rounded-r-xl">
                    <button
                        onClick={() => {
                          contactformm7lol();
                          voireDataDossier(doc.id);
                        }}
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 active:scale-[0.98] transition"
                    >
                      Détails <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 0}
                onClick={() => setPrecedant(currentPage)}
            >
              page precedente
            </button>

            <span className="text-sm font-semibold text-gray-800">
            {tPage === 0 ? 0 : currentPage + 1} / {tPage}
          </span>

            <button
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={tPage === 0 || currentPage === tPage - 1}
                onClick={() => setSuivant(currentPage)}
            >
              page suivante
            </button>
          </div>

          {/* Modal */}
          {contactm7lol && (
              <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                  onClick={contactformmsdod}
              >
                <div
                    className="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl bg-[#f8fafc] shadow-2xl border border-white/60"
                    onClick={(e) => e.stopPropagation()}
                >
                  {/* Header modal */}
                  <div className="flex items-center justify-between px-6 py-5 border-b bg-white">
                    <div className="flex items-center gap-3">
                      <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: `${primaryGreen}20` }}
                      >
                        <FaFileMedical size={24} color={primaryGreen} />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          Dossier Médical
                        </h2>
                        <p className="text-sm text-gray-500">
                          Consultez les informations médicales et l’historique des consultations.
                        </p>
                      </div>
                    </div>

                    <button
                        onClick={contactformmsdod}
                        className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-600 text-lg transition"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Body modal */}
                  <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6">
                    {/* Synthèse */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                        <FaHistory color={primaryGreen} />
                        Synthèse Médicale
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <SummaryCard
                          icon={FaTint}
                          title="Groupe Sanguin"
                          value={dossier?.g_sanguin ?? "—"}
                          color="#e74c3c"
                      />

                      <SummaryCard
                          icon={FaAllergies}
                          title="Allergies Notées"
                          value={dossier?.allergisNotes ?? "Aucune"}
                          color="#f1c40f"
                      />

                      <SummaryCard
                          icon={FaPrescriptionBottleAlt}
                          title="Traitements Actuels"
                          value={dossier?.ttmt_Actuel ?? "Aucun"}
                          color="#3498db"
                      />
                    </div>

                    {/* Consultations */}
                    <div className="mb-8">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                        <FaCalendarCheck color={primaryGreen} />
                        Historique des Consultations
                      </h3>

                      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                        <div className="overflow-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                            <tr className="text-left">
                              <th className="px-4 py-3 font-semibold text-gray-600">Date</th>
                              <th className="px-4 py-3 font-semibold text-gray-600">Médecin</th>
                              <th className="px-4 py-3 font-semibold text-gray-600">Spécialité</th>
                              <th className="px-4 py-3 font-semibold text-gray-600">Motif</th>
                              <th className="px-4 py-3 font-semibold text-gray-600">Diagnostic</th>
                              <th className="px-4 py-3 font-semibold text-gray-600">Hôpital</th>
                              <th className="px-4 py-3 font-semibold text-gray-600">Médicaments</th>
                            </tr>
                            </thead>

                            <tbody>
                            {(dossier?.phistorys ?? []).length === 0 ? (
                                <tr>
                                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                    Aucun historique de consultation trouvé.
                                  </td>
                                </tr>
                            ) : (
                                dossier.phistorys.map((c, index) => (
                                    <tr
                                        key={index}
                                        className="border-b last:border-b-0 hover:bg-emerald-50/40 transition"
                                    >
                                      <td className="px-4 py-3 text-gray-700">
                                        {c?.date ? new Date(c.date).toLocaleDateString() : "—"}
                                      </td>
                                      <td className="px-4 py-3 text-gray-700">{c?.medecin ?? "—"}</td>
                                      <td className="px-4 py-3 text-gray-700">{c?.specialite ?? "—"}</td>
                                      <td className="px-4 py-3 text-gray-700">{c?.motif_viste || "Aucun"}</td>
                                      <td className="px-4 py-3 text-gray-700">{c?.diagnostic || "Aucun"}</td>
                                      <td className="px-4 py-3 text-gray-700">{c?.nom_hospital ?? "—"}</td>
                                      <td className="px-4 py-3 text-gray-700">{c?.nomMedicsment || "Aucun"}</td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Vaccinations */}
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                        <FaCalendarCheck color={primaryGreen} />
                        Historique Vaccinations
                      </h3>

                      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                        <div className="overflow-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                            <tr className="text-left">
                              <th className="px-4 py-3 font-semibold text-gray-600">Date</th>
                              <th className="px-4 py-3 font-semibold text-gray-600">Infirmier</th>
                              <th className="px-4 py-3 font-semibold text-gray-600">Spécialité</th>
                              <th className="px-4 py-3 font-semibold text-gray-600">Motif</th>
                              <th className="px-4 py-3 font-semibold text-gray-600">Observation</th>
                              <th className="px-4 py-3 font-semibold text-gray-600">Hôpital</th>
                              <th className="px-4 py-3 font-semibold text-gray-600">Vaccin</th>
                            </tr>
                            </thead>

                            <tbody>
                            {(dossier?.phistorysInferm ?? []).length === 0 ? (
                                <tr>
                                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                    Aucun historique de vaccination trouvé.
                                  </td>
                                </tr>
                            ) : (
                                dossier.phistorysInferm.map((v, index) => (
                                    <tr
                                        key={index}
                                        className="border-b last:border-b-0 hover:bg-emerald-50/40 transition"
                                    >
                                      <td className="px-4 py-3 text-gray-700">
                                        {v?.date ? new Date(v.date).toLocaleDateString() : "—"}
                                      </td>
                                      <td className="px-4 py-3 text-gray-700">{v?.medecin ?? "—"}</td>
                                      <td className="px-4 py-3 text-gray-700">{v?.specialite ?? "—"}</td>
                                      <td className="px-4 py-3 text-gray-700">{v?.motif_viste ?? "—"}</td>
                                      <td className="px-4 py-3 text-gray-700">{v?.diagnostic ?? "—"}</td>
                                      <td className="px-4 py-3 text-gray-700">{v?.nom_hospital ?? "—"}</td>
                                      <td className="px-4 py-3 text-gray-700">{v?.nomMedicsment ?? "—"}</td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer modal */}
                  <div className="px-6 py-4 border-t bg-white flex justify-end">
                    <button
                        onClick={contactformmsdod}
                        className="px-5 py-2.5 rounded-xl text-white font-semibold transition hover:opacity-90"
                        style={{ backgroundColor: primaryGreen }}
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

export default Historique;