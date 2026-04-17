import React from 'react';
import styles from './MonPlanning.module.css';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

const MonPlanning = () => {
    const jours = [
        { nom: 'LUN', num: 10 },
        { nom: 'MAR', num: 11, active: true },
        { nom: 'MER', num: 12 },
        { nom: 'JEU', num: 13 },
        { nom: 'VEN', num: 14 },
        { nom: 'SAM', num: 15 },
        { nom: 'DIM', num: 16 },
    ];

    const heures = ['08:00', '09:00', '10:00', '11:00', '12:00'];

    // Simulation des rendez-vous
    const rdv = [
        { jour: 10, heure: '08:00', titre: 'M. Durand', desc: 'Injection INS', type: 'blue' },
        { jour: 11, heure: '08:00', titre: 'Mme. Petit', desc: 'Soins post-op', type: 'blue' },
        { jour: 13, heure: '08:00', titre: 'M. Leroy', desc: 'A confirmer', type: 'lightBlue' },
        { jour: 11, heure: '09:00', titre: 'Garde Clinique', desc: 'Unité 4B', type: 'purple' },
        { jour: 12, heure: '09:00', titre: 'Mme. Girard', desc: 'Prélèvement', type: 'blue' },
        { jour: 10, heure: '10:00', titre: 'Pause café', desc: '', type: 'green' },
        { jour: 11, heure: '10:00', titre: 'Garde Clinique', desc: 'Unité 4B', type: 'purple' },
        { jour: 11, heure: '11:00', titre: 'Garde Clinique', desc: 'Unité 4B', type: 'purple' },
    ];

    return (
        <div className={styles.container}>
            {/* Header du planning */}
            <header className={styles.header}>
                <div className={styles.dateTitle}>
                    <h1>Semaine 24 <span className={styles.month}>Juin</span></h1>
                    <span className={styles.year}>2024</span>
                </div>

                <div className={styles.controls}>
                    <div className={styles.navButtons}>
                        <button className={styles.arrowBtn}><ChevronLeft size={20} /></button>
                        <button className={styles.todayBtn}>Aujourd'hui</button>
                        <button className={styles.arrowBtn}><ChevronRight size={20} /></button>
                    </div>
                    <div className={styles.viewSwitch}>
                        <button className={styles.switchBtn}>Mois</button>
                        <button className={`${styles.switchBtn} ${styles.activeSwitch}`}>Semaine</button>
                        <button className={styles.switchBtn}>Jour</button>
                    </div>
                </div>
            </header>

            {/* Grille du Calendrier */}
            <div className={styles.calendarCard}>
                <div className={styles.gridContainer}>
                    {/* Header des jours */}
                    <div className={styles.timeLabel}>HEURE</div>
                    {jours.map((j, i) => (
                        <div key={i} className={`${styles.dayHeader} ${j.active ? styles.activeDay : ''}`}>
                            <span className={styles.dayNom}>{j.nom}</span>
                            <span className={styles.dayNum}>{j.num}</span>
                        </div>
                    ))}

                    {/* Grille de temps */}
                    {heures.map((h, i) => (
                        <React.Fragment key={i}>
                            <div className={styles.timeRowLabel}>{h}</div>
                            {jours.map((j, idx) => {
                                const appointment = rdv.find(r => r.jour === j.num && r.heure === h);
                                return (
                                    <div key={idx} className={styles.gridCell}>
                                        {appointment && (
                                            <div className={`${styles.event} ${styles[appointment.type]}`}>
                                                <div className={styles.eventTitre}>{appointment.titre}</div>
                                                <div className={styles.eventDesc}>{appointment.desc}</div>
                                                {j.active && h === '08:00' && <div className={styles.currentTimeLine}></div>}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MonPlanning;