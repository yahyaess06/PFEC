import React, { useEffect, useMemo, useState } from "react";
import styles from "./PatientsList.module.css";
import { Calendar, Check, X, HeartPulse } from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
    getRdvInfermier,
    voireStsInfermier,
    confirmerRdvInfermier,
    annulerRdvInfermier,
} from "../../services/RdvInfermierService.js";

const PatientsList = () => {
    const [rdvs, setRdvs] = useState([]);
    const [stats, setStats] = useState(null);
    const [activeFilter, setActiveFilter] = useState("Tous");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [rdvRes, statsRes] = await Promise.all([
                getRdvInfermier(),
                voireStsInfermier(),
            ]);

            setRdvs(rdvRes.data || []);
            setStats(statsRes.data || null);
        } catch (e) {
            console.error("Erreur loadData:", e);
            setRdvs([]);
            setStats(null);
        } finally {
            setLoading(false);
        }
    };

    const confirmer = async (id) => {
        try {
            await confirmerRdvInfermier(id);
            loadData();
        } catch (e) {
            console.error("Erreur confirmer:", e);
        }
    };

    const annuler = async (id) => {
        try {
            await annulerRdvInfermier(id);
            loadData();
        } catch (e) {
            console.error("Erreur annuler:", e);
        }
    };

    // const normalizeStatus = (s = "") => {
    //     const v = String(s).trim().toLowerCase();
    //
    //     if (v === "valide" || v === "validé") return "En attente";
    //     if (v === "confirmer" || v === "confirmé") return "Confirmés";
    //     if (v === "terminer" || v === "terminé") return "Terminés";
    //     if (v === "en attente") return "En attente";
    //
    //     return "En attente";
    // };
    const normalizeStatus = (s = "") => {
        const v = String(s).trim().toLowerCase();

        if (v === "valide" || v === "validé") return "En attente";
        if (v === "confirmer" || v === "confirmé") return "Confirmés";
        if (v === "terminer" || v === "terminé") return "Terminés";
        if (v === "anullee" || v === "annulée" || v === "annulee") return "Annulés";

        return "En attente";
    };

    const filteredRdvs = useMemo(() => {
        return rdvs.filter((r) => {
            const status = normalizeStatus(r.status);
            if (activeFilter === "Tous") return true;
            return status === activeFilter;
        });
    }, [rdvs, activeFilter]);

    const getStatusClass = (status) => {
        switch (status) {
            case "En attente":
                return "bg-amber-100 text-amber-700";
            case "Confirmés":
                return "bg-emerald-100 text-emerald-700";
            case "Terminés":
                return "bg-indigo-100 text-indigo-700";
            case "Annulés":
                return "bg-red-100 text-red-700";
            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.planningHeader}>

                <div className={styles.planningLeft}>
                    <div className={styles.planningIcon}>
                        <HeartPulse size={20} />
                    </div>

                    <div>
                        <div className={styles.planningLabel}>Planning Infirmier</div>
                        <div className={styles.planningDate}>
                            {new Date().toLocaleDateString()}
                        </div>
                    </div>
                </div>

                <div className={styles.planningTime}>
                    {rdvs.length
                        ? (rdvs[0].periode === "apres_midi" ? "Après-midi" : "Matin")
                        : ""}
                </div>
            </div>
            {/* Stats */}
            <div className={styles.statsBanner}>
                <div className={`${styles.statBox} ${styles.statBlue}`}>
                    <p>Total</p>
                    <h2>{stats?.countRdvTotal ?? rdvs.length}</h2>
                </div>

                <div className={`${styles.statBox} ${styles.statOrange}`}>
                    <p>En attente</p>
                    <h2>{stats?.countRdvenAttend ?? 0}</h2>
                </div>

                <div className={`${styles.statBox} ${styles.statGreen}`}>
                    <p>Terminés</p>
                    <h2>{stats?.countRdvterminer ?? 0}</h2>
                </div>
            </div>

            <div className={styles.contentCard}>
                {/* Tabs */}
                <div className={styles.tabs}>
                    {["Tous", "En attente", "Confirmés", "Terminés"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveFilter(tab)}
                            className={`${styles.tab} ${
                                activeFilter === tab ? styles.activeTab : ""
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>PATIENT</th>
                            <th>CIN</th>
                            <th>NUMERO</th>
                            <th>DUREE</th>
                            <th>MOTIF</th>
                            <th>STATUT</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>

                        <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className={styles.emptyState}>
                                    Chargement...
                                </td>
                            </tr>
                        ) : filteredRdvs.length === 0 ? (
                            <tr>
                                <td colSpan="6" className={styles.emptyState}>
                                    Aucun rendez-vous à afficher.
                                </td>
                            </tr>
                        ) : (
                            filteredRdvs.map((rdv) => {
                                const statusLabel = normalizeStatus(rdv.status);

                                return (
                                    <tr key={rdv.id}>
                                        <td>
                                            {rdv.nomPatient} {rdv.prenomPatient}
                                        </td>
                                        <td>
                                          <span style={{ fontWeight: 500, color: "#475569" }}>
                                            {rdv.cinPatient}
                                          </span>
                                        </td>
                                        <td>{rdv.numero}</td>

                                        <td>
                                            <div
                                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                                                    rdv.periode === "apres_midi"
                                                        ? "bg-orange-100 text-orange-600"
                                                        : "bg-blue-100 text-blue-600"
                                                }`}
                                            >
                                                <Calendar size={14} />
                                                {rdv.periode === "apres_midi"
                                                    ? "Après-midi"
                                                    : "Matin"}
                                            </div>
                                        </td>

                                        <td>{rdv.description}</td>

                                        <td>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                                statusLabel
                            )}`}
                        >
                          {statusLabel}
                        </span>
                                        </td>
                                        <td className={styles.actionsCell}>
                                            {statusLabel === "En attente" ? (
                                                <>
                                                    <button
                                                        className={styles.actionIcon}
                                                        onClick={() => confirmer(rdv.id)}
                                                        title="Confirmer"
                                                    >
                                                        <Check size={16} />
                                                    </button>

                                                    <button
                                                        className={styles.actionIcon}
                                                        onClick={() => annuler(rdv.id)}
                                                        title="Annuler"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </>
                                            ) : statusLabel === "Confirmés" ? (
                                                <button
                                                    className={styles.actionDetail}
                                                    onClick={() =>
                                                        navigate("/infirmier/consultation", {
                                                            state: { rdvId: rdv.id }
                                                        })
                                                    }
                                                    title="Voir détail"
                                                >
                                                    Détail
                                                </button>
                                            ) : (
                                                <span style={{ opacity: 0.4 }}>—</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PatientsList;