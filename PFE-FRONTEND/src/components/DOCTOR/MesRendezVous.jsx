import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./MesRendezVous.module.css";
import { Check, X, Eye, Calendar, MapPin, MoreHorizontal } from "lucide-react";
import {
  anulerRdv,
  confirmerRdv,
  voireRdvParMedcin,
  voireStatistiques,
} from "../../services/rdvService.js";

const MesRendezVous = () => {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [statistique, setStatistique] = useState({});
  const [rdvs, setRdvs] = useState([]);
  const isGyneco = rdvs.some(r =>
      r.specialite?.toLowerCase().includes("gyn")
  );
  // const isGyneco = rdvs.some(r => r.nbMoins !== null);
  // const isGyneco = rdvs.some(r => r.nbMoins >= 1 && r.nbMoins <= 9);

  const normalizeStatus = (s = "") => {
    const v = String(s).trim().toLowerCase();

    if (v === "valide" || v === "validé" || v === "validé") return "En attente";

    if (
        v === "Confirmer" ||
        v === "confirmes" ||
        v === "confirmé" ||
        v === "confirmés"
    )
      return "Confirmés";
    if (v === "termine" || v === "termines" || v === "terminé" || v === "terminés" || v==="terminer")
      return "Terminés";
    if (v === "en attente" || v === "enattente") return "En attente";

    return s;
  };
  const navigate = useNavigate();

  const statusToClassKey = (s = "") => normalizeStatus(s).replace(/\s/g, "");

  const voirecount = async () => {
    try {
      const res = await voireStatistiques();
      setStatistique(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const vm = async () => {
    try {
      const res = await voireRdvParMedcin();
      setRdvs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const conf = async (id) => {
  //   console.log(id);
  //   try {
  //     await confirmerRdv(id);
  //     vm();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  //----bdalt
  const conf = async (id) => {
    try {
      await confirmerRdv(id);

      await vm();
      await voirecount();

    } catch (err) {
      console.error(err);
    }
  };//-------

  const anul = async (id) => {
    try {
      await anulerRdv(id);
      //vm();
      await vm();//zadt awiat
      await voirecount();//zadt 3la wad reload dyal les stat
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    voirecount();
    vm();
  }, []);

  // const filteredRdvs = useMemo(() => {
  //   return rdvs.filter((apt) => {
  //     const status = normalizeStatus(apt.status);
  //
  //     if (activeFilter === "Tous") return true;
  //     if (activeFilter === "Confirmés") return status === "Confirmer";
  //     if (activeFilter === "Terminés") return status === "Terminés";
  //     if (activeFilter === "En attente") return status === "En attente";
  //
  //     return true;
  //   });
  // }, [rdvs, activeFilter]);
  const filteredRdvs = useMemo(() => {
    let data = rdvs.filter((apt) => {
      const status = normalizeStatus(apt.status);
      if (activeFilter === "Tous") return true;
      if (activeFilter === "Confirmés") return status === "Confirmer";
      if (activeFilter === "Terminés") return status === "Terminés";
      if (activeFilter === "En attente") return status === "En attente";
      return true;
    });
    data.sort((a, b) => {
      const aPriority = a.nbMoins === 8 || a.nbMoins === 9;
      const bPriority = b.nbMoins === 8 || b.nbMoins === 9;
      if (aPriority && !bPriority) return -1;
      if (!aPriority && bPriority) return 1;
      return a.numRdv - b.numRdv;
    });
    return data;
  }, [rdvs, activeFilter]);

  //onClick={()=>navigate(`/doctor/consultation/${apt.rdvId}`)}

  return (
      <div className={styles.container}>
        {/*<h2 className="text-sm text-gray-500 mb-2">*/}
        {/*  Planning du {new Date().toLocaleDateString()} - {rdvs.length ? rdvs[0].duree : ""}*/}
        {/*</h2>*/}
        <div className={styles.planningHeader}>
          <span className={styles.planningLabel}>Planning</span>

          <span className={styles.planningDate}>
        {new Date().toLocaleDateString()}
      </span>
          <span className={styles.planningDivider}></span>
          <span className={styles.planningTime}>
        {rdvs.length ? (rdvs[0].duree === "apres_midi" ? "Après-midi" : "Matin") : ""}
      </span>
        </div>
        <div className="flex flex-wrap gap-6 mt-8 mb-4">
          <div className="flex-1 min-w-[220px] p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg hover:scale-105 transition-transform duration-300">
            <p className="text-sm opacity-80">Total</p>
            <h2 className="text-3xl font-bold">{statistique?.countRdvTotal ?? 0}</h2>
          </div>

          <div className="flex-1 min-w-[220px] p-6 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg hover:scale-105 transition-transform duration-300">
            <p className="text-sm opacity-80">En attente</p>
            <h2 className="text-3xl font-bold">{statistique?.countRdvenAttend ?? 0}</h2>
          </div>

          <div className="flex-1 min-w-[220px] p-6 rounded-2xl bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg hover:scale-105 transition-transform duration-300">
            <p className="text-sm opacity-80">Terminés</p>
            <h2 className="text-3xl font-bold">{statistique?.countRdvterminer ?? 0}</h2>
          </div>
        </div>

        <div className={styles.contentCard}>
          <div className={styles.tabs}>
            {["Tous", "En attente", "Confirmés", "Terminés"].map((tab) => (
                <button
                    key={tab}
                    className={`${styles.tab} ${activeFilter === tab ? styles.activeTab : ""}`}
                    onClick={() => setActiveFilter(tab)}
                >
                  {tab}
                </button>
            ))}
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
              <tr>
                <th>PATIENT</th>
                <th>CIN</th>
                {isGyneco && (
                    <>
                    {/*<th>CIN</th>*/}
                      <th>Mois</th>
                    </>
                )}
                <th>NUMERO</th>
                <th>DUREE</th>
                <th>MOTIF</th>
                <th>STATUT</th>
                <th>ACTIONS</th>
              </tr>
              </thead>
              <tbody>
              {filteredRdvs.map((apt) => {
                const status = normalizeStatus(apt.status);

                return (
                    <tr key={apt.id}>
                      <td>
                        <div className={styles.patientCell}>
                          <div className={styles.avatar}>{apt.nomPatient.charAt(0).toUpperCase()}</div>
                          <div>
                            <div className={styles.pName}>{apt.nomPatient} {apt.prenomPatient}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.patientCell}>
                          <div className="rounded-2xl bg-blue-100 font-semibold text-blue-600 py-2 px-3 ">{apt.cin}</div>
                        </div>
                      </td>
                      {isGyneco && (
                          <>
                          {/*<td>{apt.cin}</td>*/}

                            <td>
                              <div className="flex items-center gap-2">
                                {apt.nbMoins}

                                {apt.priority && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                      PRIORITÉ
                                    </span>
                                )}
                              </div>
                            </td>
                          </>
                      )}
                      <td>
                        <div className={styles.patientCell}>
                          <div className={styles.avatar}>{apt.numRdv}</div>
                        </div>
                      </td>

                      <td>
                        <div className={styles.dateTime}>
                          <div className={`flex items-center gap-2 text-sm font-medium px-2 py-1 rounded-full w-fit 
  ${apt.duree === "apres_midi"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-blue-100 text-blue-600"}`}>

                            <Calendar size={14}/>
                            {apt.duree === "apres_midi" ? "Après-midi" : "Matin"}
                          </div>
                        </div>
                      </td>

                      <td className={styles.motifCell}>{apt.description}</td>

                      <td>
                      <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ring-1
                          ${
                              status === "En attente"
                                  ? "bg-amber-100 text-amber-700 ring-amber-200"
                                  : status === "Confirmés"
                                      ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
                                      : status === "Terminés"
                                          ? "bg-indigo-100 text-indigo-700 ring-indigo-200"
                                          : "bg-slate-100 text-slate-700 ring-slate-200"
                          }
                        `}
                      >
                        {status}
                      </span>
                      </td>

                      <td>
                        <div className={styles.actionGroup}>
                          {status === "En attente" ? (
                              <>
                                <button
                                    className={styles.btnOk}
                                    title="Valider"
                                    onClick={() => conf(apt.rdvId)}
                                >
                                  <Check size={16}/>
                                </button>
                                <button
                                    onClick={() => anul(apt.rdvId)}
                                    className={styles.btnNo}
                                    title="Refuser"
                                >
                                  <X size={16}/>
                                </button>
                              </>
                          ) : status === "Confirmer" ? (

                              <button className={styles.btnView} onClick={() => navigate("/doctor/consultation", {
                                state: {rdvId: apt.rdvId}
                              })}>
                                <Eye size={16}/> Détails
                              </button>
                          ) : null}

                          <button className={styles.btnMore}>
                            <MoreHorizontal size={16}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                );
              })}

              {filteredRdvs.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{padding: 16, textAlign: "center", opacity: 0.7}}>
                      Aucun rendez-vous à afficher.
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default MesRendezVous;
