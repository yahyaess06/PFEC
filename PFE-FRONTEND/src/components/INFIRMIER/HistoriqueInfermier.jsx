import React, { useEffect, useState } from "react";
import styles from "./HistoriqueInfermier.module.css";
import { Search, ChevronRight } from "lucide-react";
import { voirePatientInf } from "../../services/HistoriqueInfermierService";
import { getDossier } from "../../services/HistoriqueService";

const HistoriqueInfermier = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [tPage, setTPage] = useState(0);
    const [patients, setPatients] = useState([]);
    const [searchNom, setSearchNom] = useState("");
    const [searchCin, setSearchCin] = useState("");
    const [cinMode, setCinMode] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [dossier, setDossier] = useState({phistorysInferm: []});

    const loadPatients = async () => {
        try {
            const res = await voirePatientInf(
                currentPage,
                cinMode ? "" : searchNom,
                cinMode ? searchCin : ""
            );

            setPatients(res.data.patients);
            setTPage(res.data.totalPages);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadPatients();
    }, [currentPage, searchNom, searchCin]);

    const openDossier = async (id) => {
        try {
            const res = await getDossier(id);
            setDossier(res.data);
            setModalOpen(true);
            console.log("data : ",res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Historique des Patients (Infirmier)</h1>
                <p>Consultation en lecture seule des dossiers médicaux</p>
            </header>

            <div className={styles.searchBar}>
                <Search size={18} />
                <input
                    type="text"
                    value={cinMode ? searchCin : searchNom}
                    onChange={(e) => {
                        cinMode ? setSearchCin(e.target.value) : setSearchNom(e.target.value);
                        setCurrentPage(0);
                    }}
                    placeholder="Rechercher patient..."
                />
                <button onClick={() => setCinMode(!cinMode)}>
                    {cinMode ? "Recherche CIN" : "Recherche Nom"}
                </button>
            </div>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th>PATIENT</th>
                    <th>CIN</th>
                    <th>ACTIONS</th>
                </tr>
                </thead>
                <tbody>
                {patients.map((p) => (
                    <tr key={p.id}>
                        <td>{p.nom} {p.prenom}</td>
                        <td>{p.cin || "-"}</td>
                        <td>
                            <button onClick={() => openDossier(p.id)}>
                                Voir dossier <ChevronRight size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            {tPage > 1 && (
                <div className={styles.pagination}>
                    <button
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        ← Précédent
                    </button>

                    {[...Array(tPage).keys()].map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? styles.activePage : ""}
                        >
                            {page + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === tPage - 1}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Suivant →
                    </button>
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>Dossier Médical</h2>

                        <div className={styles.cardRow}>
                            <div>
                                <label>Groupe Sanguin</label>
                                <p>{dossier?.g_sanguin || "Aucune"}</p>
                            </div>
                            <div>
                                <label>Allergies</label>
                                <p>{dossier?.allergisNotes || "Aucune"}</p>
                            </div>
                            <div>
                                <label>Traitements</label>
                                <p>{dossier?.ttmt_Actuel || "Aucune"}</p>
                            </div>
                        </div>

                        <h3>Historique des Vaccinations</h3>

                        <div className={styles.historyTable}>
                            {dossier?.phistorysInferm?.length === 0 ? (
                                <p>Aucun historique</p>
                            ) : (
                                <table className={styles.innerTable}>
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Infirmier</th>
                                        <th>Spécialité</th>
                                        <th>Motif</th>
                                        <th>Observation</th>
                                        <th>Hôpital</th>
                                        <th>Vaccin</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dossier?.phistorysInferm?.map((c, index) => (
                                        <tr key={index}>
                                            <td>{new Date(c.date).toLocaleDateString()}</td>
                                            <td>{c.medecin}</td>
                                            <td>{c.specialite}</td>
                                            <td>{c.motif_viste || "Aucune"}</td>
                                            <td>{c.diagnostic || "Aucune"}</td>
                                            <td>{c.nom_hospital}</td>
                                            <td>{c.nomMedicsment || "Aucune"}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        <button onClick={() => setModalOpen(false)}>Fermer</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoriqueInfermier;