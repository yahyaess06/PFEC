import React, { useEffect, useState } from "react";
//import styles from "../DOCTOR/Consultation.module.css";
import styles from "./ConsultationInfermier.module.css";
import {
    User,
    Activity,
    FileText,
    Save,
    AlertCircle,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { getDetailInfermier } from "../../services/RdvInfermierService";
import api from "../../services/api";

const ConsultationInfermier = () => {
    //const { id } = useParams();
    const location = useLocation();
    const rdvId = location.state?.rdvId;
    const navigate = useNavigate();

    const [rdv, setRdv] = useState(null);

    const [nomVaccin, setNomVaccin] = useState("");
    const [motif, setMotif] = useState("");
    const [observation, setObservation] = useState("");
    // const [groupeSanguin, setGroupeSanguin] = useState("");
    // const [allergies, setAllergies] = useState("");
    // const [traitements, setTraitements] = useState("");
    // const [dejaRempli, setDejaRempli] = useState(false);

    useEffect(() => {
        if (!rdvId) {
            navigate("/infirmier/rendez-vous");
            return;
        }
        const fetchData = async () => {
            try {
                const res = await getDetailInfermier(rdvId);
                const data = res.data;
                setRdv(data);
            } catch (err) {
                console.error("Erreur chargement détail:", err);
            }
        };
        console.log("id infermer : ",rdvId);
        fetchData();
    }, [rdvId]);

    const handleSave = async () => {
        try {
            await api.post("/infermier/vaccination", {
                dossierId: rdv.dossierId,
                nomVaccin,
                motif,
                observation,
            });

            //alert("Vaccination enregistrée!!");
            //navigate("/infermier/rendez-vous");
            navigate("/infirmier/rendez-vous");
        } catch (err) {
            console.error("Erreur save vaccination:", err);
            alert("Erreur lors de lenregestremnt");
        }
    };

    if (!rdv) return <p>Chargement...</p>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <h1>Vaccination</h1>
                    <span className={styles.sessionStatus}>Session active</span>
                </div>
                <div className={styles.actionButtons}>
                    <button className={styles.btnSave} onClick={handleSave}>
                        <Save size={18} /> Enregistrer
                    </button>
                </div>
            </header>

            <div className={styles.layout}>
                {/* Sidebar Patient */}
                <aside className={styles.patientSidebar}>
                    <div className={styles.patientCard}>
                        <div className={styles.avatarLarge}>
                            {rdv.nomPatient?.charAt(0)}
                            {rdv.prenomPatient?.charAt(0)}
                        </div>
                        <h2>
                            {rdv.nomPatient} {rdv.prenomPatient}
                        </h2>

                        {/*<div className={styles.vitalsGrid}>
                            <div className={styles.vitalItem}>
                                <span className={styles.vitalLabel}>CIN</span>
                                <span className={styles.vitalValue}>{rdv.cinPatient}</span>
                            </div>
                            <div className={styles.vitalItem}>
                                <span className={styles.vitalLabel}>Numéro RDV</span>
                                <span className={styles.vitalValue}>{rdv.numeroPatient}</span>
                            </div>
                        </div>*/}
                        <div className={styles.vitalsGrid}>
                            <div className={styles.vitalItem}>
                                <span className={styles.vitalLabel}>Âge : </span>
                                <span className={styles.vitalValue}>
                                      {rdv.age ? `${rdv.age} ans` : "--"}
                                    </span>
                            </div>
                            <div className={styles.vitalItem}>
                                <span className={styles.vitalLabel}>Sexe : </span>
                                <span className={styles.vitalValue}>
                                      {rdv.sexe || "--"}
                                    </span>
                            </div>
                        </div>
                    </div>

                    {/*<div className={styles.infoSection}>
                        <div className={styles.sectionHeader}>
                            <AlertCircle size={16} color="#ef4444" />
                            <h3>Description</h3>
                        </div>
                        <div className={styles.alertBox}>
                            <p>{rdv.description || "Aucune description"}</p>
                        </div>
                    </div>*/}
                </aside>

                {/* Form Vaccination */}
                <main className={styles.reportMain}>
                    <div className={styles.formSection}>
                        <div className={styles.formHeader}>
                            <div className={`${styles.iconBox} ${styles.blue}`}>
                                <User size={20} />
                            </div>
                            <h3>Dossier Médical</h3>
                        </div>

                        <div className={styles.readOnlyGrid}>
                            <div className={styles.readOnlyItem}>
                                <span className={styles.readOnlyLabel}>Groupe Sanguin</span>
                                <span className={styles.readOnlyValue}>
                                    {rdv.groupeSanguin
                                        ? rdv.groupeSanguin.replace("_", " ")
                                        : "Non renseigné"}
                                  </span>
                            </div>

                            <div className={styles.readOnlyItem}>
                                <span className={styles.readOnlyLabel}>Allergies</span>
                                <span className={styles.readOnlyValue}>
                                    {rdv.allergies || "Aucune"}
                                  </span>
                            </div>

                            <div className={styles.readOnlyItem}>
                                <span className={styles.readOnlyLabel}>Traitements Actuels</span>
                                <span className={styles.readOnlyValue}>
                                    {rdv.traitements || "Aucun"}
                                  </span>
                            </div>
                        </div>

                        <div className={styles.readOnlyNote}>
                            🔒 Modification réservée au médecin
                        </div>
                    </div>
                    <div className={styles.formSection}>
                        <div className={styles.formHeader}>
                            <div className={`${styles.iconBox} ${styles.red}`}>
                                <User size={20} />
                            </div>
                            <h3>Vaccination</h3>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Nom du Vaccin</label>
                            <input
                                type="text"
                                value={nomVaccin}
                                onChange={(e) => setNomVaccin(e.target.value)}
                                placeholder="Nom du Vaccin..."
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Motif</label>
                            <textarea
                                value={motif}
                                onChange={(e) => setMotif(e.target.value)}
                                placeholder="Motif de la vaccination..."
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Observation</label>
                            <textarea
                                value={observation}
                                onChange={(e) => setObservation(e.target.value)}
                                placeholder="Observation clinique..."
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ConsultationInfermier;