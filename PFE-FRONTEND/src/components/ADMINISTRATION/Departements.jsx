import React, { useEffect, useState } from 'react';
import styles from './Departements.module.css';
import { FaHospital, FaPlus, FaUsers, FaXmark } from 'react-icons/fa6';
import { voireDepartements } from "../../services/DepartementService.js";

const Departements = () => {
    // Données locales (pour le modal d'ajout uniquement ici)
    const [departements, setDepartements] = useState([
        { id: 1, nom: 'Cardiologie', description: 'Soins cardiaques et vasculaires', medecins: 12, statut: 'Actif' },
        { id: 2, nom: 'Urgences', description: 'Prise en charge immédiate 24/7', medecins: 24, statut: 'Actif' },
        { id: 3, nom: 'Pédiatrie', description: 'Santé des nourrissons et enfants', medecins: 8, statut: 'Actif' },
        { id: 4, nom: 'Dermatologie', description: 'Traitement des maladies de peau', medecins: 5, statut: 'En pause' },
    ]);

    // ✅ Modal
    const [showAddModal, setShowAddModal] = useState(false);

    // ✅ Form
    const [form, setForm] = useState({
        nom: '',
        description: '',
        effectif: ''
    });

    const [errors, setErrors] = useState({});

    const openModal = () => {
        setForm({ nom: '', description: '', effectif: '' });
        setErrors({});
        setShowAddModal(true);
    };

    const closeModal = () => {
        setShowAddModal(false);
        setErrors({});
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.nom.trim()) newErrors.nom = "Nom obligatoire";
        if (!form.description.trim()) newErrors.description = "Description obligatoire";

        const eff = Number(form.effectif);
        if (form.effectif === '' || Number.isNaN(eff) || eff < 0 || eff > 500) {
            newErrors.effectif = "Effectif invalide (0-500)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [paspas, setPaspas] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [tPage, settPage] = useState(0);

    const voiredeps = async () => {
        try {
            const res = await voireDepartements(currentPage);
            settPage(res?.data?.totalPages ?? 0);
            setPaspas(res?.data?.deps ?? []);
        } catch (err) {
            console.error(err);
        }
    };

    const setSuivant = (c) => {
        if (c < tPage - 1) {
            setCurrentPage(c + 1);
        }
    };

    const setPrecedant = (c) => {
        if (c > 0) {
            setCurrentPage(c - 1);
        }
    };

    useEffect(() => {
        voiredeps();
    }, [currentPage]);

    const handleAddDepartement = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const id = departements.length ? Math.max(...departements.map(d => d.id)) + 1 : 1;

        const newDept = {
            id,
            nom: form.nom.trim(),
            description: form.description.trim(),
            medecins: Number(form.effectif),
            statut: 'Actif'
        };

        setDepartements(prev => [newDept, ...prev]);
        closeModal();
    };

    // Utilitaire d'affichage: prioriser les données API (paspas), fallback sur departements
    const rows = (paspas && paspas.length > 0) ? paspas : departements;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Gestion des Départements</h1>
                    <p className={styles.subtitle}>Consultez et gérez les services de la clinique</p>
                </div>

                <button className={styles.addBtn} onClick={openModal} type="button">
                    <FaPlus /> Nouveau Département
                </button>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.departTable}>
                    <thead>
                    <tr>
                        <th>Nom du Département</th>
                        <th>Effectif</th>
                    </tr>
                    </thead>

                    <tbody>
                    {rows.map((dept) => (
                        <tr key={dept.id ?? dept.nomDepartement}>
                            <td>
                                <div className={styles.deptInfo}>
                                    <div className={styles.deptIcon}><FaHospital /></div>

                                    {/* Si API: nomDepartement, sinon: nom */}
                                    <strong>{dept.nomDepartement ?? dept.nom}</strong>
                                </div>
                            </td>

                            <td>
                  <span className={styles.countBadge}>
                    <FaUsers size={12} />{" "}
                      {(dept.nombreMedcinDepartement ?? dept.medecins)} Médecins
                  </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
                <button
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 0}
                    onClick={() => setPrecedant(currentPage)}
                    type="button"
                >
                    page precedente
                </button>

                <span className="text-sm font-semibold text-gray-800">
          {tPage > 0 ? `${currentPage + 1} / ${tPage}` : "1 / 1"}
        </span>

                <button
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={tPage === 0 || currentPage === tPage - 1}
                    onClick={() => setSuivant(currentPage)}
                    type="button"
                >
                    page suivante
                </button>
            </div>

            {/* ✅ POPUP AJOUT DÉPARTEMENT */}
            {showAddModal && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Ajouter un Département</h2>
                            <button className={styles.modalClose} onClick={closeModal} type="button">
                                <FaXmark />
                            </button>
                        </div>

                        <form className={styles.modalForm} onSubmit={handleAddDepartement}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Nom du Département</label>
                                    <input name="nom" value={form.nom} onChange={handleChange} />
                                    {errors.nom && <span className={styles.errorText}>{errors.nom}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Effectif</label>
                                    <input name="effectif" type="number" value={form.effectif} onChange={handleChange} />
                                    {errors.effectif && <span className={styles.errorText}>{errors.effectif}</span>}
                                </div>

                                <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                                    <label>Description</label>
                                    <input name="description" value={form.description} onChange={handleChange} />
                                    {errors.description && <span className={styles.errorText}>{errors.description}</span>}
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                                    Annuler
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Departements;