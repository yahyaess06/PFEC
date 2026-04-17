import React, { useEffect, useState } from 'react';
import styles from './Historique.module.css';

import { 
    FaHistory, 
    FaAllergies, 
    FaPrescriptionBottleAlt, 
    FaTint, 
    FaUserMd, 
    FaCalendarCheck,
    FaFileMedical
} from 'react-icons/fa'; 

const primaryGreen = '#2ecc71';




const SummaryCard = ({ icon: Icon, title, value, color }) => (
    <div className={styles.summaryCard}>
        <div className={styles.summaryIcon} style={{ backgroundColor: color }}>
            <Icon size={24} color="white" />
        </div>
        <div className={styles.summaryContent}>
            <p className={styles.summaryTitle}>{title}</p>
            <h2 className={styles.summaryValue}>{value}</h2>
        </div>
    </div>
);

const Historique = () => {
    const [summary, setSummary] = useState(null);
    const [consultations, setConsultations] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9090/patient/historique-medical', {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Full backend response : ", data);
                setSummary({
                    groupeSanguin: data.g_sanguin ?? 'Aucun',
                    allergies: data.allergisNotes ?? 'Aucun',
                    traitements: data.ttmt_Actuel ?? 'Aucun'
                });

                setConsultations(data.phistorys ?? []); //phistorys et  (|| [])had or condition
                setVaccinations(data.phistorysInferm ?? []);
            })
            .catch(err => console.error(err))
    }, []);
    console.log(consultations);

    const handleDownload  = () => {
       fetch('http://localhost:9090/patient/historique-medical/telechargee', {
           method: 'GET',
           headers: {
               'Authorization': `Bearer ${localStorage.getItem('token')}`
           }
       })
           .then(res => res.blob())
           .then(blob => {
               const u = window.URL.createObjectURL(blob);
               const a = document.createElement('a');
               a.href = u;
               a.download = 'historique_medical.pdf';
               a.click();
           });
    };

    const handleDownloadOrd = (idOrd)=>{
        fetch(`http://localhost:9090/patient/historique-medical/telechargee/${idOrd}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.blob())
            .then(blob => {
                const u = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = u;
                a.download = `ordonnance_${idOrd}.pdf`;
                a.click();
            })
            .catch(err => console.error(err));
    }

    const handleDownloadVacc = (id) => {
        fetch(`http://localhost:9090/patient/historique-medical/telechargee/vaccination/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.blob())
            .then(blob => {
                const u = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = u;
                a.download = `vaccination_${id}.pdf`;
                a.click();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className={styles.container}>
            
            {/* --- 1. En-tête de la Page --- */}
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>
                    <FaFileMedical size={30} style={{ marginRight: '10px', color: primaryGreen }} />
                    Historique Médical
                </h1>
                <p className={styles.subtitle}>
                    Consultez vos données de santé et les rapports de consultations passées.
                </p>
            </div>

            {/* --- 2. Synthèse et Infos Clés --- */}
            {/*<h2 className={styles.sectionHeader}>
                <FaHistory size={20} style={{ marginRight: '10px', color: primaryGreen }} />
                Synthèse Médicale
            </h2>*/}
            <div className={styles.syntheseHeader}>
                <h2 className={styles.sectionHeader}>
                    <FaHistory size={20} style={{ marginRight: '10px', color: primaryGreen }} />
                    Synthèse Médicale
                </h2>

                <button className={styles.downloadBtn} onClick={handleDownload}>
                    📥 Télécharger l’historique médical
                </button>
            </div>
            <div className={styles.summaryContainer}>
                <SummaryCard 
                    icon={FaTint}
                    title="Groupe Sanguin"
                    value={summary?.groupeSanguin}
                    color="#e74c3c" // Rouge pour le sang
                />
                <SummaryCard 
                    icon={FaAllergies}
                    title="Allergies Notées"
                    value={summary?.allergies}
                    color="#f1c40f" // Jaune pour l'avertissement
                />
                <SummaryCard 
                    icon={FaPrescriptionBottleAlt}
                    title="Traitements Actuels"
                    value={summary?.traitements}
                    color="#3498db" // Bleu pour le traitement
                />
            </div>

            {/* --- 3. Tableau des Consultations Passées --- */}
            <h2 className={styles.sectionHeader} style={{ marginTop: '30px' }}>
                <FaCalendarCheck size={20} style={{ marginRight: '10px', color: primaryGreen }} />
                Historique des Consultations
            </h2>
            <div className={styles.tableWrapper}>
                <table className={styles.historyTable}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeader}>Date</th>
                            <th className={styles.tableHeader}>Médecin</th>
                            <th className={styles.tableHeader}>Spécialité</th>
                            <th className={styles.tableHeader}>Motif de la visite</th>
                            <th className={styles.tableHeader}>Diagnostic / Note</th>
                            <th className={styles.tableHeader}>Nom hopital</th>
                            <th className={styles.tableHeader}>Medicaments</th>
                            <th className={styles.tableHeader}>Action</th>
                            {/*<th className={styles.tableHeader}>Rapport</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                        {consultations.map((c) => (
                            <tr key={c.idOrd}>
                                <td className={styles.tableCell}>{new Date(c.date).toLocaleDateString()}</td>
                                <td className={styles.tableCell}>{c.medecin}</td>
                                <td className={styles.tableCell}>{c.specialite}</td>
                                <td className={styles.tableCell}>{c.motif_viste || "Aucun"}</td>
                                <td className={styles.tableCell}>{c.diagnostic || "Aucun"}</td>
                                <td className={styles.tableCell}>{c.nom_hospital}</td>
                                <td className={styles.tableCell}>{c.nomMedicsment || "Aucun"}</td>
                                {/*<td className={styles.tableCell}>
                                    {c.rapport ? (
                                        <button 
                                            className={styles.reportButton}
                                            onClick={() => handleViewReport(c.id)}
                                        >
                                            Voir Rapport
                                        </button>
                                    ) : (
                                        <span className={styles.noReport}>N/A</span>
                                    )}
                                </td>*/}
                                <td className={styles.tableCell}>
                                    <button
                                        className={styles.downloadSingleBtn}
                                        onClick={() => handleDownloadOrd(c.idOrd)}
                                    >
                                         Télécharger
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/*<div className={styles.downloadContainer}>
                    <button className={styles.downloadBtn} onClick={handleDownload}>
                        📥 Télécharger l’historique médical
                    </button>
                </div>*/}

                {consultations.length === 0 && (
                    <div className={styles.noData}>
                        Aucun historique de consultation trouvé.
                    </div>
                )}
            </div>



            {/* ================= VACCINATIONS TABLE ================= */}
            <h2 className={styles.sectionHeader} style={{ marginTop: '40px' }}>
                <FaCalendarCheck size={20} style={{ marginRight: '10px', color: primaryGreen }} />
                Historique Vaccinations
            </h2>

            <div className={styles.tableWrapper}>
                <table className={styles.historyTable}>
                    <thead>
                    <tr>
                        <th className={styles.tableHeader}>Date</th>
                        <th className={styles.tableHeader}>Infirmier</th>
                        <th className={styles.tableHeader}>Spécialité</th>
                        <th className={styles.tableHeader}>Motif</th>
                        <th className={styles.tableHeader}>Observation</th>
                        <th className={styles.tableHeader}>Nom hopital</th>
                        <th className={styles.tableHeader}>Vaccin</th>
                        <th className={styles.tableHeader}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vaccinations.map((v) => (
                        <tr key={v.idOrd}>
                            <td className={styles.tableCell}>
                                {new Date(v.date).toLocaleDateString()}
                            </td>
                            <td className={styles.tableCell}>{v.medecin}</td>
                            <td className={styles.tableCell}>{v.specialite}</td>
                            <td className={styles.tableCell}>{v.motif_viste || "Aucune"}</td>
                            <td className={styles.tableCell}>{v.diagnostic || "Aucune"}</td>
                            <td className={styles.tableCell}>{v.nom_hospital}</td>
                            <td className={styles.tableCell}>{v.nomMedicsment || "Aucune"}</td>
                            <td className={styles.tableCell}>
                                <button
                                    className={styles.downloadSingleBtn}
                                    onClick={() => handleDownloadVacc(v.idOrd)}
                                >
                                    Télécharger
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {vaccinations.length === 0 && (
                    <div className={styles.noData}>
                        Aucun historique de vaccination trouvé.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Historique;