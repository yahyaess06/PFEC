import React, {useEffect, useState} from 'react';
import styles from './Dashboard.module.css';
import {
    FaUsers,
    FaUserDoctor,
    FaStethoscope,
    FaPercent,
    FaClock,
    FaDoorOpen,
    FaCalendarCheck,
    FaStar,
    FaCalendarDays,
    FaArrowsRotate
} from 'react-icons/fa6';
import {voireCounts, voirePourcentage} from "../../services/dashboardadminService.js";

const Dashboard = () => {

    const[counts,setCounts]=useState(null);
    const voireC=async ()=>{
        try {
            const res=await voireCounts()
            setCounts(res.data)
        }catch (err){
            console.log(err)
        }
    }
    const[datee,setDatee]=useState('');
    const[pourc,setPourc]=useState(null);
    const voireP=async()=>{
        try {
            const res=await voirePourcentage(datee);
            setPourc(res.data)
            // console.log(res.data)
        }catch (err){
            console.log(err)
        }
    }
    useEffect(() => {
        voireP()
    }, [datee]);

    const stats = [
        { label: 'Patients Total', value: counts?.totalPatient ?? 0, trend: '', icon: <FaUsers />, color: '#eff6ff', iconColor: '#3b82f6' },
        { label: 'Docteurs Actifs', value: counts?.totalDoctor ?? 0, trend: '', icon: <FaUserDoctor />, color: '#ecfdf5', iconColor: '#10b981' },
        { label: 'Consultations/Mois', value: counts?.consultationsparmois ?? 0, trend: '', icon: <FaStethoscope />, color: '#fffbeb', iconColor: '#f59e0b' },
        { label: 'En Attente', value: counts?.rdvEnattend ?? 0, trend: '🔴 Patients en salle', icon: <FaClock />, color: '#fef2f2', iconColor: '#ef4444' },
        { label: 'Infirmieres Actifs', value: counts?.countInfermiers ?? 0, trend: '', icon: <FaDoorOpen />, color: '#f5f3ff', iconColor: '#8b5cf6' },
        { label: 'RDV Aujourd\'hui', value:counts?.rdvLyom ?? 0 , trend: '📅 ', icon: <FaCalendarCheck />, color: '#fff7ed', iconColor: '#f97316' },
    ];
    useEffect(() => {
        voireC();
    }, []);

    const confirmes = counts?.countrdvConfirmer ?? 0;
    const termines = counts?.consultationsparmois ?? 0;
    const annules = counts?.countrdvAnnuler ?? 0;

    const totalStatus = confirmes + termines + annules;

    const pConfirmes = totalStatus ? (confirmes / totalStatus) * 100 : 0;
    const pTermines = totalStatus ? (termines / totalStatus) * 100 : 0;
    const pAnnules = totalStatus ? (annules / totalStatus) * 100 : 0;

    return (
        <div className={styles.container}>


            {/* Grille des 8 cartes */}
            <div className={styles.statsGrid}>
                {stats.map((s, i) => (
                    <div key={i} className={styles.statCard}>
                        <div
                            className={styles.iconBox}
                            style={{ backgroundColor: s.color, color: s.iconColor }}
                        >
                            {s.icon}
                        </div>
                        <div className={styles.infoBox}>
                            <h3 className={styles.statLabel}>{s.label}</h3>
                            <p className={styles.value}>{s.value}</p>
                            <p className={styles.trend}>{s.trend}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Section des Graphiques */}
            <div className={styles.chartsSection}>
                <div className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <h3>Consultations par Département</h3>
                        <div className={styles.filterGroup}>
                            <label>Date</label>
                            <input
                                name="date"
                                value={datee}
                                onChange={(e) => setDatee(e.target.value)}
                                type="date" className={styles.input} placeholder="jj/mm/aaaa"/>
                        </div>
                    </div>

                    <div className={styles.chartBody}>
                        <div className={styles.gridLines}>
                            <span></span><span></span><span></span><span></span>
                        </div>


                        <div className={styles.barContainer}>
                            {[
                                {
                                    label: 'Cardiologie',
                                    h: `${pourc?.pourcentageCardio ?? 0}%`,
                                    val: pourc?.pourcentageCardio ?? 0,
                                    color: '#3b82f6',
                                },
                                {
                                    label: 'Dermatologie',
                                    h: `${pourc?.pourcentageDer ?? 0}%`,
                                    val: pourc?.pourcentageDer ?? 0,
                                    color: '#ef4444',
                                },
                                {
                                    label: 'Neurologie',
                                    h: `${pourc?.pourcentageNeu ?? 0}%`,
                                    val: pourc?.pourcentageNeu ?? 0,
                                    color: '#f59e0b',
                                },
                                {
                                    label: 'Gynécologie',
                                    h: `${pourc?.pourcentageGyne ?? 0}%`,
                                    val: pourc?.pourcentageGyne ?? 0,
                                    color: '#10b981',
                                },
                                {
                                    label: 'Générale',
                                    h: `${pourc?.pourcentageGenerale ?? 0}%`,
                                    val: pourc?.pourcentageGenerale ?? 0,
                                    color: '#8b5cf6',
                                },
                            ].map((item, idx) => (
                                <div className={styles.barGroup} key={idx}>
                                    <div
                                        className={styles.bar}
                                        style={{
                                            height: item.h,
                                            backgroundColor: item.color,
                                            backgroundImage: `linear-gradient(180deg, ${item.color}, #ffffff33)`,
                                        }}
                                    >
                                        <span className={styles.tooltip}>{item.val}</span>
                                    </div>
                                    <p>{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.chartCard}>
                    <h3>Répartition des Status (RDV)</h3>

                    <div className={styles.donutContainer}>
                        <div
                            className={styles.donut}
                            style={{
                                background: `conic-gradient(
          #3b82f6 0% ${pConfirmes}%,
          #10b981 ${pConfirmes}% ${pConfirmes + pTermines}%,
          #ef4444 ${pConfirmes + pTermines}% 100%
        )`
                            }}
                        >
                            <div className={styles.donutCenter}>
                                <strong>{totalStatus}</strong>
                                <span>Total</span>
                            </div>
                        </div>

                        <div className={styles.legend}>
                            <div className={styles.legendItem}>
                                <span className={styles.blue}></span>
                                Confirmés: {confirmes} ({Math.round(pConfirmes)}%)
                            </div>

                            <div className={styles.legendItem}>
                                <span className={styles.green}></span>
                                Terminés: {termines} ({Math.round(pTermines)}%)
                            </div>

                            <div className={styles.legendItem}>
                                <span className={styles.red}></span>
                                Annulés: {annules} ({Math.round(pAnnules)}%)
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;