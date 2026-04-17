import React, { useEffect, useState } from "react";
import styles from "./RendezVous.module.css";
import { FaEye } from "react-icons/fa6";
import { voireRdvInf, voireRdvsAdmin } from "../../services/rdvService.js";
import { voiredeps } from "../../services/DepartementService.js";
import { voireStaus } from "../../services/StausService.js";

const RendezVous = () => {
    const [mode, setMode] = useState("simple");

    const [tPage, settPage] = useState(0);
    const [rdvs, setrdvs] = useState([]);
    const [deps, setDeps] = useState([]);
    const [stt, setstt] = useState([]);
    const [iseroor, setiseroor] = useState(false);

    const [reqp, setreqp] = useState({
        date: "",
        departement: "",
        s: null,
        page: 0,
    });

    const [reqpinf, setreqpinf] = useState({
        date: "",
        s: null,
        page: 0,
    });

    // ===== fetch RDV SIMPLE (médecin) =====
    const voirRdvs = async () => {
        try {
            const res = await voireRdvsAdmin(reqp);
            setrdvs(res.data.ads);
            settPage(res.data.totalPages);
            setIsInf(false);
            if (res.data.currentPage !== reqp.page) {
                setreqp((prev) => ({ ...prev, page: res.data.currentPage }));
            }

            setiseroor(false);
        } catch (err) {
            console.log(err);
            setiseroor(true);
            setrdvs([]);
            settPage(0);
        }
    };

    const [isInf,setIsInf]=useState(false);
    const voireInfs = async () => {
        try {
            const res = await voireRdvInf(reqpinf);
            setrdvs(res.data.ads);
            settPage(res.data.totalPages);
            setIsInf(true);
            if (res.data.currentPage !== reqpinf.page) {
                setreqpinf((prev) => ({ ...prev, page: res.data.currentPage }));
            }

            setiseroor(false);
        } catch (err) {
            console.log(err);
            setiseroor(true);
            setrdvs([]);
            settPage(0);
        }
    };


    useEffect(() => {
        (async () => {
            try {
                const res = await voiredeps();
                setDeps(res.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const res = await voireStaus();
                setstt(res.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    // ===== trigger fetch selon mode =====
    useEffect(() => {
        if (mode === "simple") voirRdvs();
    }, [mode, reqp]);

    useEffect(() => {
        if (mode === "vaccin") voireInfs();
    }, [mode, reqpinf]);

    const handleChangeSimple = (e) => {
        const { name, value } = e.target;
        setreqp((prev) => ({
            ...prev,
            [name]: name === "s" && value === "" ? null : value,
            page: 0,
        }));
    };

    const handleChangeInf = (e) => {
        const { name, value } = e.target;
        setreqpinf((prev) => ({
            ...prev,
            [name]: name === "s" && value === "" ? null : value,
            page: 0,
        }));
    };

    // ===== pagination =====
    const prevPage = () => {
        if (mode === "simple") {
            setreqp((prev) => ({ ...prev, page: Math.max(prev.page - 1, 0) }));
        } else {
            setreqpinf((prev) => ({ ...prev, page: Math.max(prev.page - 1, 0) }));
        }
    };

    const nextPage = () => {
        if (mode === "simple") {
            setreqp((prev) => ({ ...prev, page: Math.min(prev.page + 1, tPage - 1) }));
        } else {
            setreqpinf((prev) => ({ ...prev, page: Math.min(prev.page + 1, tPage - 1) }));
        }
    };

    const currentPage = mode === "simple" ? reqp.page : reqpinf.page;

    return (
        <div className={styles.container}>
            {/* ===== boutons navigation ===== */}
            <div className={styles.topActions}>
                <button
                    type="button"
                    className={`${styles.switchBtn} ${mode === "simple" ? styles.activeBtn : ""}`}
                    onClick={() => setMode("simple")}
                >
                    RDV Simple
                </button>

                <button
                    type="button"
                    className={`${styles.switchBtn} ${mode === "vaccin" ? styles.activeBtn : ""}`}
                    onClick={() => setMode("vaccin")}
                >
                    RDV Vaccin
                </button>
            </div>

            {/* ===== filtres ===== */}
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={styles.filterCard}>
                    <div className={styles.filterGroup}>
                        <label>Date</label>
                        <input
                            name="date"
                            value={mode === "simple" ? reqp.date : reqpinf.date}
                            onChange={mode === "simple" ? handleChangeSimple : handleChangeInf}
                            type="date"
                            className={styles.input}
                        />
                    </div>

                    {mode === "simple" && (
                        <div className={styles.filterGroup}>
                            <label>Département</label>
                            <select
                                name="departement"
                                value={reqp.departement}
                                onChange={handleChangeSimple}
                                className={styles.select}
                            >
                                <option value="">Tous les départements</option>
                                {deps.map((dep, index) => (
                                    <option key={index} value={dep.departementNom}>
                                        {dep.departementNom}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className={styles.filterGroup}>
                        <label>Statut</label>
                        <select
                            name="s"
                            value={(mode === "simple" ? reqp.s : reqpinf.s) ?? ""}
                            onChange={mode === "simple" ? handleChangeSimple : handleChangeInf}
                            className={styles.select}
                        >
                            <option value="">Tous les statuts</option>
                            {stt.map((sta, index) => (
                                <option key={index} value={sta}>
                                    {sta}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>

            {/* ===== table ===== */}
            <div className={styles.tableCard}>
                <table className={styles.appointmentTable}>
                    <thead>
                    <tr>
                        <th>Date/Heure</th>
                        <th>Patient</th>
                        {
                            isInf ? (
                                <>
                                    <th>Infermier</th>
                                </>
                            ) : (
                                <>
                                    <th>Docteur</th>
                                    <th>Département</th>
                                </>
                            )
                        }

                        <th>numero de rdv</th>
                        <th>description</th>
                        <th>Statut</th>
                    </tr>
                    </thead>

                    <tbody>
                    {iseroor ? (
                        <tr>
                            <td colSpan={8} style={{ textAlign: "center" }}>
                                ya pas de rendez vous
                            </td>
                        </tr>
                    ) : (
                        rdvs.map((rdv) => (
                            <tr key={rdv.id}>
                                <td className={styles.timeCol}>
                                    <strong>{rdv.date ? new Date(rdv.date).toLocaleDateString("fr-FR") : "-"}</strong>
                                    <span>{rdv.duree === "apres_midi" ? "Aprés midi" : "Matin"}</span>
                                </td>
                                <td>
                                    <div className={styles.patientInfo}>
                                        <strong>
                                            {rdv.nom} {rdv.prenom}
                                        </strong>
                                        <span>{rdv.age}</span>
                                    </div>
                                </td>
                                {isInf ? (
                                    <>
                                        <td className={styles.docName}>
                                            {rdv.nomInf} {rdv.prenomInf}
                                        </td>
                                    </>
                                ) : (
                                    <>
                                    <td className={styles.docName}>
                                        {rdv.nomDoc} {rdv.prenomDoc}
                                    </td>
                                    <td className={styles.deptName}>{rdv.departement}</td></>
                        )}
                                <td className={styles.roomName}>{rdv.numeroRdv}</td>
                                <td className={styles.motifText}>{rdv.description}</td>
                                <td>
                    <span
                        className={`${styles.statusBadge} ${
                            rdv.status === "Terminée"
                                ? styles.bgTermine
                                : rdv.status === "En cours"
                                    ? styles.bgEnCours
                                    : styles.bgConfirme
                        }`}
                    >
                      {rdv.status}
                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>

                {/* pagination */}
                <div className="mt-6 flex items-center justify-between gap-3">
                    <button
                        className="rounded-lg mx-2 my-3 border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentPage === 0}
                        onClick={prevPage}
                        type="button"
                    >
                        page precedente
                    </button>

                    <span className="text-sm font-semibold text-gray-800">
            {tPage === 0 ? 0 : currentPage + 1} / {tPage}
          </span>

                    <button
                        className="rounded-lg mx-2 my-3 border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={tPage === 0 || currentPage === tPage - 1}
                        onClick={nextPage}
                        type="button"
                    >
                        page suivante
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RendezVous;