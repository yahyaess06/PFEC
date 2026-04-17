import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Users, CalendarCheck, Clock, CheckCircle2, XCircle } from "lucide-react";
import axios from "../../services/api";

const Dashboard = () => {

    const [stats, setStats] = useState({
        totalPatients: 0,
        confirme: 0,
        enAttente: 0,
        termine: 0,
        annule: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const res = await axios.get("/infermier/dashboardInf");
            setStats(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const totalRdv =
        stats.confirme +
        stats.enAttente +
        stats.termine +
        stats.annule;

    const percent = (value) =>
        totalRdv ? (value / totalRdv) * 100 : 0;

    return (
        <div className={styles.dashboardWrapper}>
            <header className={styles.topBar}>
                <div>
                    <h1>Dashboard Infirmier</h1>
                    <p>Suivi global des rendez-vous et patients</p>
                </div>
            </header>

            {/* Stat Cards */}
            <div className={styles.statsRowFive}>
                <StatCard title="Total Patients" value={stats.totalPatients} icon={<Users />} color="blue" />
                <StatCard title="Confirmés" value={stats.confirme} icon={<CalendarCheck />} color="green" />
                <StatCard title="En Attente" value={stats.enAttente} icon={<Clock />} color="orange" />
                <StatCard title="Terminés" value={stats.termine} icon={<CheckCircle2 />} color="blueDark" />
                <StatCard title="Annulés" value={stats.annule} icon={<XCircle />} color="red" />
            </div>

            {/* PIE CHART */}
            <div className={styles.card}>
                <h3>Répartition des Rendez-vous</h3>

                <div className={styles.pieSection}>

                    <div
                        className={styles.pieChart}
                        style={{
                            background: `
                                conic-gradient(
                                    #22c55e 0% ${percent(stats.confirme)}%,
                                    #f59e0b ${percent(stats.confirme)}% ${percent(stats.confirme) + percent(stats.enAttente)}%,
                                    #0ea5e9 ${percent(stats.confirme) + percent(stats.enAttente)}% ${percent(stats.confirme) + percent(stats.enAttente) + percent(stats.termine)}%,
                                    #ef4444 ${percent(stats.confirme) + percent(stats.enAttente) + percent(stats.termine)}% 100%
                                )
                            `
                        }}
                    >
                        <div className={styles.pieInner}>
                            <span>{totalRdv}</span>
                            <small>RDV</small>
                        </div>
                    </div>
                    {/* GRAPH AREA */}
                    <div className={styles.graphBox}>

                        <ProgressBar
                            label="Confirmés"
                            value={stats.confirme}
                            percent={percent(stats.confirme)}
                            color="#22c55e"
                        />

                        <ProgressBar
                            label="En Attente"
                            value={stats.enAttente}
                            percent={percent(stats.enAttente)}
                            color="#f59e0b"
                        />

                        <ProgressBar
                            label="Terminés"
                            value={stats.termine}
                            percent={percent(stats.termine)}
                            color="#0ea5e9"
                        />

                        <ProgressBar
                            label="Annulés"
                            value={stats.annule}
                            percent={percent(stats.annule)}
                            color="#ef4444"
                        />

                    </div>

                    {/* Legend */}
                    {/*<div className={styles.legend}>*/}
                    {/*    <LegendItem color="#22c55e" label="Confirmés" value={stats.confirme} />*/}
                    {/*    <LegendItem color="#f59e0b" label="En Attente" value={stats.enAttente} />*/}
                    {/*    <LegendItem color="#0ea5e9" label="Terminés" value={stats.termine} />*/}
                    {/*    <LegendItem color="#ef4444" label="Annulés" value={stats.annule} />*/}
                    {/*</div>*/}

                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className={`${styles.statCard} ${styles[color]}`}>
            <div className={styles.iconContainer}>{icon}</div>
            <h2>{value}</h2>
            <p>{title}</p>
        </div>
    );
};

// const LegendItem = ({ color, label, value }) => {
//     return (
//         <div className={styles.legendItem}>
//             <span className={styles.colorDot} style={{ background: color }}></span>
//             <span>{label}</span>
//             <strong>{value}</strong>
//         </div>
//     );
// };

/* PROGRESS BAR */
const ProgressBar = ({ label, value, percent, color }) => {
    return (
        <div className={styles.progressItem}>

            <div className={styles.progressHeader}>
                <span>{label}</span>
                <strong>{value}</strong>
            </div>

            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{
                        width: `${percent}%`,
                        background: color
                    }}
                />
            </div>

        </div>
    );
};

export default Dashboard;