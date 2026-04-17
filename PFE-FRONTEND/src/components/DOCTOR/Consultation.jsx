import React, { useEffect, useState } from "react";
import styles from "./Consultation.module.css";
import {
  User,
  Activity,
  FileText,
  Stethoscope,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import {
  getDossierByPatient,
  saveConsultation,
  updateDossier,
} from "../../services/ConsultationService.js";
import { getRdvById } from "../../services/RdvMedService.js";
import { useLocation, useNavigate } from "react-router-dom";
import { voireMedicaments } from "../../services/medicamentServices.js";

const Consultation = () => {
  const location = useLocation();
  const rdvId = location.state?.rdvId;

  const [rdv, setRdv] = useState(null);
  const [patient, setPatient] = useState(null);

  const [groupeSanguin, setGroupeSanguin] = useState("");
  const [allergies, setAllergies] = useState("");
  const [traitements, setTraitements] = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [motif, setMotif] = useState("");
  const [dejaFait, setDejaFait] = useState(false);

  // Ajout pour ordonnance + medicaments (ajoutés au 1er code)
  //const [dateOrd, setDateOrd] = useState("");

  const navigate = useNavigate();

  const groupes = [
    "A_POSITIF",
    "A_NEGATIF",
    "B_POSITIF",
    "B_NEGATIF",
    "AB_POSITIF",
    "AB_NEGATIF",
    "O_POSITIF",
    "O_NEGATIF",
  ];

  // =========================
  // Chargement RDV + Dossier
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!rdvId) return;

        const rdvRes = await getRdvById(rdvId);
        setRdv(rdvRes.data);
        setPatient(rdvRes.data.patient);

        const dossierRes = await getDossierByPatient(rdvRes.data.patient.id);

        const sValue = dossierRes.data.sanguin || "";
        setGroupeSanguin(sValue);
        if (sValue) setDejaFait(true);

        setAllergies(dossierRes.data.allerges_notees || "");
        setTraitements(dossierRes.data.t_actuel || "");
      } catch (error) {
        console.error("Erreur chargement consultation:", error);
      }
    };

    fetchData();
  }, [rdvId]);

  // =========================
  // Medicaments: modal + pagination + recherche + selection
  // =========================
  const [mhlol, setmhlol] = useState(false);
  const toggleMenu = () => setmhlol(!mhlol);

  const [contactm7lol, setcontactm7lol] = useState(false);
  const contactformm7lol = () => setcontactm7lol(true);
  const contactformmsdod = () => setcontactm7lol(false);

  const [selectedMeds, setSelectedMeds] = useState([]);


  const [searchMed, setSearchMed] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [tPage, settPage] = useState(0);
  const [medicament, setMedicament] = useState([]);

  const voireMedipagination = async () => {
    try {
      const res = await voireMedicaments(currentPage, searchMed);
      setMedicament(res.data.meds || []);
      settPage(res.data.totalPages ?? 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (contactm7lol) {
      voireMedipagination();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchMed, contactm7lol]);
  useEffect(() => {
    console.log("MEDICAMENT DATA:", medicament);
  }, [medicament]);
  useEffect(() => {
    console.log("SELECTED MEDS:", selectedMeds);
  }, [selectedMeds]);


  const setPrecedant = (c) => {
    if (c > 0) setCurrentPage(c - 1);
  };

  const setSuivant = (c) => {
    if (c < tPage - 1) setCurrentPage(c + 1);
  };

  //Ajout medicament (avec prévention des doublons)
  const ajoutermedicament = (m) => {
    setSelectedMeds((prev) => {
      const exists = prev.some((x) => x.idMedicament  === m.idMedicament );
      if (exists) return prev;
      return [...prev, m];
    });
    console.log("MED OBJECT:", m);
  };

  const removeMed = (id)=>{
    setSelectedMeds(
        prev=>prev.filter(m=>m.idMedicament !== id)
    );
  };
  // =========================
  // Save
  // =========================
  const handleSave = async () => {
    try {
      if (!patient?.id) {
        alert("Patient introuvable");
        return;
      }

      await updateDossier(patient.id, {
        sanguin: groupeSanguin,
        allerges_notees: allergies,
        t_actuel: traitements,
      });

      await saveConsultation(rdvId, {
        motif: motif,
        diagnostic: diagnostic,
        dateOrd: new Date(),
        medicaments: selectedMeds.map(m=>m.idMedicament)
        // Si ton backend accepte la liste, décommente:
        // medicaments: selectedMeds.map(m => m.id),
      });
      console.log(medicament);

      navigate("/doctor/rendez-vous");
    } catch (error) {
      console.error("error sauvegarde consultation :", error);
      alert("error lors de l'enregistrement!!!");
    }
  };

  return (
      <div className={styles.container}>
        {/* Barre d'actions supérieure */}
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <h1>Consultation Médicale</h1>
            <span className={styles.sessionStatus}>Session active</span>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.btnSave} onClick={handleSave}>
              <Save size={18} /> Enregistrer
            </button>
            {/* optionnel */}
            {/* <button className={styles.btnFinish}><CheckCircle size={18} /> Terminer</button> */}
          </div>
        </header>

        <div className={styles.layout}>
          {/* Colonne Gauche : Profil & Constantes */}
          <aside className={styles.patientSidebar}>
            <div className={styles.patientCard}>
              {/*<div className={styles.avatarLarge}>JD</div>*/}
              <div className={styles.avatarLarge}>
                {patient
                    ? `${patient.nom?.charAt(0).toUpperCase()}${patient.prenom?.charAt(0).toUpperCase()}`
                    : "--"}
              </div>
              <h2>{patient ? `${patient.nom} ${patient.prenom}` : "Chargement..."}</h2>

              <div className={styles.vitalsGrid}>
                <div className={styles.vitalItem}>
                  <span className={styles.vitalLabel}>Âge </span>
                  <span className={styles.vitalValue}>
                  {patient ? `${patient.age} ans` : "--"}
                </span>
                </div>
                <div className={styles.vitalItem}>
                  <span className={styles.vitalLabel}>Sexe </span>
                  <span className={styles.vitalValue}>{patient ? patient.sexe : "--"}</span>
                </div>
              </div>
            </div>

            {/*<div className={styles.infoSection}>*/}
            {/*  <div className={styles.sectionHeader}>*/}
            {/*    <AlertCircle size={16} color="#ef4444" />*/}
            {/*    <h3>Alertes & Allergies</h3>*/}
            {/*  </div>*/}
            {/*  <div className={styles.alertBox}>*/}
            {/*    <p>{allergies?.trim() ? allergies : "Aucune allergie connue"}</p>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/*<div className={styles.infoSection}>*/}
            {/*  <div className={styles.sectionHeader}>*/}
            {/*    <Activity size={16} color="#0096db" />*/}
            {/*    <h3>Dernières Constantes</h3>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </aside>

          {/* Colonne Droite : Formulaire de Saisie */}
          <main className={styles.reportMain}>
            <div className={styles.formSection}>
              <div className={styles.formHeader}>
                <div className={`${styles.iconBox} ${styles.red}`}>
                  <User size={20} />
                </div>
                <h3>Dossier Médical</h3>
              </div>

              {/* Groupe Sanguin */}
              <div className={styles.inputGroup}>
                <label>Groupe Sanguin</label>
                <select
                    value={groupeSanguin}
                    onChange={(e) => setGroupeSanguin(e.target.value)}
                    className={styles.selectInput}
                    disabled={dejaFait}
                >
                  <option value="">-- Sélectionner --</option>
                  {groupes.map((g) => (
                      <option key={g} value={g}>
                        {g.replace("_", " ")}
                      </option>
                  ))}
                </select>
              </div>

              {/* Allergies */}
              <div className={styles.inputGroup}>
                <label>Allergies Notées</label>
                <textarea
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="Décrire les allergies du patient..."
                />
              </div>

              {/* Traitements */}
              <div className={styles.inputGroup}>
                <label>Traitements Actuels</label>
                <textarea
                    value={traitements}
                    onChange={(e) => setTraitements(e.target.value)}
                    placeholder="Traitements en cours..."
                />
              </div>
            </div>

            <div className={styles.formSection}>
              <div className={styles.formHeader}>
                <div className={`${styles.iconBox} ${styles.blue}`}>
                  <Stethoscope size={20} />
                </div>
                <h3>Motif de la visite</h3>
              </div>
              <div className={styles.inputGroup}>
              <textarea
                  value={motif}
                  onChange={(e) => setMotif(e.target.value)}
                  placeholder="Décrire les symptômes rapportés par le patient..."
              />
              </div>
            </div>

            <div className={styles.formSection}>
              <div className={styles.formHeader}>
                <div className={`${styles.iconBox} ${styles.green}`}>
                  <FileText size={20} />
                </div>
                <h3>Diagnostic & Conclusion</h3>
              </div>

              <textarea
                  className={styles.diagInput}
                  value={diagnostic}
                  onChange={(e) => setDiagnostic(e.target.value)}
                  placeholder="Établir le diagnostic..."
              />

              {/* Ajout medicaments + date ordonnance */}
              <div className={styles.inputGroup}>
                <div className="flex flex-col gap-4 w-full max-w-md">
                  <button
                      className="bg-blue-500 hover:bg-blue-600 transition duration-300
                             font-semibold text-white px-4 py-2
                             rounded-lg shadow-md hover:shadow-lg"
                      onClick={() => {
                        toggleMenu();
                        contactformm7lol();
                        setCurrentPage(0);
                      }}
                      type="button"
                  >
                    Ajouter des Médicaments
                  </button>



                  {selectedMeds.length > 0 && (
                      <div className="mt-1">
                        <div className="text-sm font-semibold text-gray-800 mb-2">
                          Médicaments sélectionnés
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedMeds.map((m) => (
                              <button
                                  key={m.idMedicament}
                                  onClick={() => removeMed(m.idMedicament)}
                                  className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700
                                     border border-blue-100 hover:bg-blue-100 transition"
                                  title="Cliquer pour retirer"
                                  type="button"
                              >
                                {m.nom} ✕
                              </button>
                          ))}
                        </div>
                      </div>
                  )}
                </div>
              </div>
            </div>

            {/* MODAL */}
            {contactm7lol && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
                    onClick={() => contactformmsdod()}
                >
                  <div
                      className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-gray-200 p-6"
                      onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Médicaments</h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Recherche et sélection par nom
                        </p>
                      </div>

                      <button
                          className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium
                               bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
                          onClick={() => contactformmsdod()}
                          type="button"
                      >
                        Fermer
                      </button>
                    </div>

                    {/* Search */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rechercher un médicament
                      </label>

                      <input
                          type="text"
                          value={searchMed}
                          onChange={(e) => {
                            setSearchMed(e.target.value);
                            setCurrentPage(0);
                          }}
                          placeholder="Ex: Doliprane..."
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5
                               text-gray-900 placeholder:text-gray-400
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>

                    {/* List */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Résultats:</span>
                        <span className="text-sm font-medium text-gray-900">
                      {medicament.length}
                    </span>
                      </div>

                      <div className="mt-3 max-h-64 overflow-auto rounded-xl border border-gray-200 bg-gray-50">
                        {medicament.length === 0 ? (
                            <div className="p-4 text-sm text-gray-500">
                              Aucun médicament trouvé.
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                              {medicament.map((m, index) => (
                                  <li
                                      key={`${m.idMedicament}-${index}`}
                                      className="p-4 hover:bg-white transition"
                                  >
                                    <div className="flex items-center justify-between gap-3">
                                      <span className="text-sm font-medium text-gray-900">{m.nom}</span>

                                      <button
                                          onClick={() => ajoutermedicament(m)}
                                          className="text-xs rounded-full bg-blue-100 text-blue-700 px-2 py-0.5"
                                          type="button"
                                      >
                                        Ajouter Médicament
                                      </button>
                                    </div>
                                  </li>
                              ))}
                            </ul>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-between gap-3">
                      <button
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={currentPage === 0}
                          onClick={() => setPrecedant(currentPage)}
                          type="button"
                      >
                        page precedente
                      </button>

                      <span className="text-sm font-semibold text-gray-800">
                    {tPage === 0 ? "0 / 0" : `${currentPage + 1} / ${tPage}`}
                  </span>

                      <button
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={tPage === 0 || currentPage === tPage - 1}
                          onClick={() => setSuivant(currentPage)}
                          type="button"
                      >
                        page suivante
                      </button>

                      <button
                          className="rounded-xl px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                          onClick={() => contactformmsdod()}
                          type="button"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
            )}
          </main>
        </div>
      </div>
  );
};

export default Consultation;
