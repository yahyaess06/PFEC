import React from 'react';
import styles from './Vaccination.module.css';
import {
    Calendar, CheckCircle, Clock, AlertTriangle,
    Search, Plus, Filter, Lightbulb, ChevronLeft, ChevronRight
} from 'lucide-react';

const Vaccination = () => {
    const patientsDuJour = [
        { id: 1, initiales: "JD", nom: "Jean Dupont", info: "42 ans • M", vaccin: "COVID-19 (Pfizer)", dose: "2 / 2", heure: "14:30", statut: "A_FAIRE" },
        { id: 2, initiales: "MC", nom: "Marie Curie", info: "68 ans • F", vaccin: "Grippe Saisonnière", dose: "1 / 1", heure: "14:45", statut: "A_FAIRE" },
        { id: 3, initiales: "PL", nom: "Pierre Lambert", info: "29 ans • M", vaccin: "Tétanos", dose: "Rappel (10 ans)", heure: "15:15", statut: "A_FAIRE" },
        { id: 4, initiales: "SR", nom: "Sophie Rousseau", info: "35 ans • F", vaccin: "Hépatite B", dose: "3 / 3", heure: "14:00", statut: "EFFECTUE" },
    ];

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.titleInfo}>
                    <h1>Gestion des Vaccinations</h1>
                    <p>Lundi, 22 Mai 2024 • Planning du jour</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.filterBtn}><Filter size={18} /> Filtrer</button>
                </div>
            </header>

            {/* Cartes de Stats */}
            <section className={styles.statsRow}>
                <div className={styles.statCard}>
                    <div className={styles.cardTop}>
                        <div className={`${styles.iconBox} ${styles.bgBlue}`}><Calendar size={20} /></div>
                        <span className={styles.statLabel}>AUJOURD'HUI</span>
                    </div>
                    <h2 className={styles.statValue}>24</h2>
                    <p className={styles.statDesc}>Rendez-vous prévus</p>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.cardTop}>
                        <div className={`${styles.iconBox} ${styles.bgGreen}`}><CheckCircle size={20} /></div>
                        <span className={styles.statLabel}>TERMINÉS</span>
                    </div>
                    <h2 className={styles.statValue}>16</h2>
                    <p className={styles.statDesc}>Vaccinations effectuées</p>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.cardTop}>
                        <div className={`${styles.iconBox} ${styles.bgOrange}`}><Clock size={20} /></div>
                        <span className={styles.statLabel}>EN ATTENTE</span>
                    </div>
                    <h2 className={styles.statValue}>8</h2>
                    <p className={styles.statDesc}>Patients restants</p>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.cardTop}>
                        <div className={`${styles.iconBox} ${styles.bgRed}`}><AlertTriangle size={20} /></div>
                        <span className={styles.statLabel}>ALERTES</span>
                    </div>
                    <h2 className={styles.statValue}>2</h2>
                    <p className={styles.statDesc}>Stocks critiques</p>
                </div>
            </section>

            <div className={styles.mainGrid}>
                {/* Colonne Gauche : Liste des patients */}
                <div className={styles.leftColumn}>
                    <div className={styles.tableCard}>
                        <div className={styles.tableHeader}>
                            <h3>Patients du jour</h3>
                            <div className={styles.searchBar}>
                                <Search size={16} />
                                <input type="text" placeholder="Rechercher un patient..." />
                            </div>
                        </div>

                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>PATIENT</th>
                                <th>VACCIN</th>
                                <th>DOSE</th>
                                <th>HEURE</th>
                                <th>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {patientsDuJour.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div className={styles.patientInfo}>
                                            <div className={styles.avatar}>{p.initiales}</div>
                                            <div>
                                                <div className={styles.pName}>{p.nom}</div>
                                                <div className={styles.pDetail}>{p.info}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                      <span className={`${styles.vaccinBadge} ${p.vaccin.includes('COVID') ? styles.vBlue : styles.vOrange}`}>
                        {p.vaccin}
                      </span>
                                    </td>
                                    <td className={styles.doseText}>{p.dose}</td>
                                    <td className={styles.timeText}>{p.heure}</td>
                                    <td>
                                        {p.statut === "A_FAIRE" ? (
                                            <button className={styles.confirmBtn}>Confirmer l'administration</button>
                                        ) : (
                                            <span className={styles.doneLabel}><CheckCircle size={14} /> EFFECTUÉ</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className={styles.pagination}>
                            <span>Affichage de 4 sur 24 patients</span>
                            <div className={styles.arrows}>
                                <ChevronLeft size={20} /> <ChevronRight size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Colonne Droite : Stocks et Protocole */}
                <div className={styles.rightColumn}>
                    <div className={styles.sideCard}>
                        <div className={styles.sideHeader}>
                            <h3>État des Stocks</h3>
                            <button className={styles.linkBtn}>Gérer le stock</button>
                        </div>

                        <div className={styles.stockList}>
                            <div className={styles.stockItem}>
                                <div className={styles.stockInfo}>
                                    <span>COVID-19 (Pfizer)</span>
                                    <span className={styles.stockCount}>12 / 100 doses</span>
                                </div>
                                <div className={styles.progressBar}><div className={styles.progressRed} style={{width: '12%'}}></div></div>
                                <span className={styles.critiqueText}>⚠️ SEUIL CRITIQUE ATTEINT</span>
                            </div>

                            <div className={styles.stockItem}>
                                <div className={styles.stockInfo}>
                                    <span>Grippe Saisonnière</span>
                                    <span className={styles.stockCount}>45 / 150 doses</span>
                                </div>
                                <div className={styles.progressBar}><div className={styles.progressOrange} style={{width: '30%'}}></div></div>
                                <span className={styles.warningText}>🕒 RECHARGER BIENTÔT</span>
                            </div>

                            <div className={styles.stockItem}>
                                <div className={styles.stockInfo}>
                                    <span>Tétanos</span>
                                    <span className={styles.stockCount}>82 / 100 doses</span>
                                </div>
                                <div className={styles.progressBar}><div className={styles.progressGreen} style={{width: '82%'}}></div></div>
                                <span className={styles.successText}>STOCK SUFFISANT</span>
                            </div>
                        </div>
                        <button className={styles.orderBtn}>Commander des doses</button>
                    </div>

                    <div className={styles.protocolCard}>
                        <div className={styles.protoIcon}><Lightbulb size={24} /></div>
                        <div>
                            <h4>Protocole Sanitaire</h4>
                            <p>N'oubliez pas d'enregistrer le numéro de lot pour chaque injection. Le temps d'observation recommandé après injection est de 15 minutes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vaccination;