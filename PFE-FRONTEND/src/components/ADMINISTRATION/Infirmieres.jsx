import React, { useEffect, useState } from "react";
import styles from "./Docteurs.module.css";
import {
    FaPlus,
    FaPen,
    FaTrash,
    FaEnvelope,
    FaPhone,
    FaXmark,
    FaRotateRight,
} from "react-icons/fa6";
import { FaStethoscope } from "react-icons/fa";

import {
    creerOuModifierInfermier,
    getCountInfermier,
    supprimerInfermier,
    voireInfermiers,
    voirInfermier,
    voireSpecsInfermier,
} from "../../services/InfermierAdminService.js";

const Infirmieres = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [editId, setEditId] = useState(null);

    const emptyForm = {
        id: null,
        cin: "",
        nom: "",
        prenom: "",
        mail: "",
        tel: "",
        age: "",
        description: "",
        specialite: "",
        dateArrivee: "",
        password: "",
    };

    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    const [count, setCount] = useState({ countInf: 0 });

    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedback, setFeedback] = useState({ type: "success", message: "" });

    const openFeedback = (type, message) => {
        setFeedback({ type, message });
        setShowFeedbackModal(true);
    };

    const closeFeedback = () => setShowFeedbackModal(false);


    const [infermier, setInfermier] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [tPage, setTPage] = useState(0);

    const [cin, setCin] = useState("");
    const [nom, setNom] = useState("");

    const [specs, setSpecs] = useState([]);
    const [selectedSpec, setSelectedSpec] = useState("");

    const [isnom, setIsNom] = useState(false);

    const voirecount = async () => {
        try {
            const res = await getCountInfermier();
            setCount(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchRows = async () => {
        try {
            const res = await voireInfermiers(
                currentPage,
                cin,
                selectedSpec,
                nom
            );
            const data = res?.data;
            setInfermier(res.data.infs);
            setCurrentPage(data?.currentPage ?? currentPage);
            setTPage(data?.totalPages ?? 0);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        voirecount();

    }, []);

    useEffect(() => {
        const loadSpecs = async () => {
            try {
                const res = await voireSpecsInfermier();
                const arr = Array.isArray(res.data) ? res.data : [];
                setSpecs(arr.map((s) => ({ nomspec: s })));
            } catch (err) {
                console.error(err);
            }
        };
        loadSpecs();
    }, []);

    useEffect(() => {
        fetchRows();
    }, [currentPage, cin, nom, selectedSpec]);

    const setSuivant = () => {
        if (currentPage < tPage - 1) setCurrentPage((p) => p + 1);
    };

    const setPrecedant = () => {
        if (currentPage > 0) setCurrentPage((p) => p - 1);
    };

    const regenerer = () => {
        const random = Math.random().toString(36).substring(2, 10);
        setForm((prev) => ({ ...prev, password: random }));
    };

    const openAddModal = () => {
        setErrors({});
        setModalMode("add");
        setEditId(null);
        setForm(emptyForm);
        setShowAddModal(true);
    };

    const closeModal = () => {
        setShowAddModal(false);
        setErrors({});
    };

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.cin.trim()) newErrors.cin = "cin obligatoire";
        if (!form.nom.trim()) newErrors.nom = "Nom obligatoire";
        if (!form.prenom.trim()) newErrors.prenom = "Prénom obligatoire";
        if (!form.specialite.trim()) newErrors.specialite = "Spécialité obligatoire";
        if (!form.tel.trim()) newErrors.tel = "Téléphone obligatoire";

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.mail);
        if (!emailOk) newErrors.mail = "Email invalide";

        if (modalMode === "add" && !form.password.trim()) {
            newErrors.password = "Mot de passe obligatoire";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const openEditModal = async (id) => {
        try {
            setErrors({});
            setModalMode("edit");
            setEditId(id);
            setShowAddModal(true);

            const res = await voirInfermier(id);
            const inf = res.data;

            const dateISO = inf?.dateArrivee
                ? String(inf.dateArrivee).slice(0, 10)
                : inf?.date_arrivee
                    ? String(inf.date_arrivee).slice(0, 10)
                    : "";

            setForm({
                id: inf?.id ?? id,
                cin: inf?.cin ?? "",
                nom: inf?.nom ?? "",
                prenom: inf?.prenom ?? "",
                mail: inf?.mail ?? inf?.email ?? "",
                tel: inf?.tel ?? inf?.telephone ?? "",
                age: inf?.age ?? "",
                description: inf?.description ?? "",
                specialite: inf?.specialite ?? "",
                dateArrivee: dateISO,
                password: "",
            });
        } catch (err) {
            console.error(err);
            openFeedback("error", "Une erreur est survenue ");
        }
    };

    const deleteInf = async (id) => {
        try {
            await supprimerInfermier(id);
            fetchRows();
            voirecount();
            openFeedback("success", "Infirmier traité avec succès ");
        } catch (err) {
            console.error(err);
            openFeedback("error", "Une erreur est survenue ");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const payload = { ...form };

            if (modalMode === "add") payload.id = null;

            if (modalMode === "edit" && (!payload.password || payload.password.trim() === "")) {
                delete payload.password;
            }

            await creerOuModifierInfermier(payload);

            closeModal();
            fetchRows();
            voirecount();

            openFeedback("success", "Infirmier traité avec succès ");
        } catch (err) {
            console.error(err);
            openFeedback("error", "Une erreur est survenue ");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Gestion des Infirmières</h1>
                    <p className={styles.subtitle}>Liste complète du personnel infirmier</p>
                </div>

                <button className={styles.addBtn} onClick={openAddModal} type="button">
                    <FaPlus /> Ajouter une Infirmière
                </button>
            </div>

            <div className="mb-6">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-lg">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10"></div>
                    <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5"></div>

                    <div className="relative">
                        <p className="text-sm opacity-80">Ensemble des infirmiers</p>
                        <h3 className="mt-2 text-4xl font-bold tracking-tight">
                            {count?.countInf ?? 0}
                        </h3>
                    </div>
                </div>
            </div>

            <div className={styles.tableCard}>
                <div className="flex items-end gap-3">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            value={isnom ? nom : cin}
                            onChange={(e) => {
                                const v = e.target.value;
                                if (isnom) setNom(v);
                                else setCin(v);
                                setCurrentPage(0);
                            }}
                            className="px-4 py-2 w-64 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                            placeholder={isnom ? "Rechercher par nom..." : "Rechercher par CIN..."}
                        />
                    </div>

                    <button
                        onClick={() => {
                            setIsNom((p) => !p);
                            setCin("");
                            setNom("");
                            setCurrentPage(0);
                        }}
                        className="h-[42px] px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                        type="button"
                    >
                        {isnom ? "Choisir par CIN" : "Choisir par nom"}
                    </button>

                    <div className="flex flex-col">
                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <FaStethoscope className="text-slate-400" size={14} />
                            Spécialité
                        </label>

                        <select
                            value={selectedSpec}
                            onChange={(e) => {
                                setSelectedSpec(e.target.value);
                                setCurrentPage(0);
                            }}
                            className="h-[42px] w-64 rounded-xl border-slate-200 bg-slate-50 px-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none border"
                        >
                            <option value="">Tous</option>
                            {specs.map((s) => (
                                <option key={s.nomspec} value={s.nomspec}>
                                    {s.nomspec}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <table className={styles.doctorTable}>
                    <thead>
                    <tr>
                        <th>Infirmier</th>
                        <th>Contact</th>
                        <th>Spécialité</th>
                        <th>CIN</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {infermier.map((inf, idx) => (
                        <tr key={`${inf.id ?? "id"}-${idx}`}>
                            <td>
                                <div className={styles.userInfo}>
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            `${inf.prenom ?? ""} ${inf.nom ?? ""}`
                                        )}&background=10b981&color=fff`}
                                        alt={`${inf.nom} ${inf.prenom}`}
                                        className={styles.avatar}
                                    />
                                    <div className={styles.userMeta}>
                                        <strong>
                                            {inf.nom} {inf.prenom}
                                        </strong>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div className={styles.contactInfo}>
                                    <p>
                                        <FaEnvelope size={12} /> {inf.mail ?? inf.email}
                                    </p>
                                    <p>
                                        <FaPhone size={12} /> {inf.tel ?? inf.telephone}
                                    </p>
                                </div>
                            </td>

                            <td>
                                <span className={styles.specBadge}>{inf.spec}</span>
                            </td>

                            <td>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-inset ring-gray-200">
                    {inf.cin}
                  </span>
                            </td>

                            <td>
                                <div className={styles.actions}>
                                    <button
                                        onClick={() => openEditModal(inf.id)}
                                        className={styles.editBtn}
                                        type="button"
                                    >
                                        <FaPen size={12} />
                                    </button>

                                    <button
                                        onClick={() => deleteInf(inf.id)}
                                        className={styles.deleteBtn}
                                        type="button"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {infermier.length === 0 && (
                        <tr>
                            <td colSpan={5} style={{ textAlign: "center", padding: "16px" }}>
                                Aucun infirmier trouvé.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
                <button
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 0}
                    onClick={setPrecedant}
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
                    onClick={setSuivant}
                    type="button"
                >
                    page suivante
                </button>
            </div>

            {showAddModal && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>
                                {modalMode === "add" ? "Ajouter une Infirmière" : "Modifier une Infirmière"}
                            </h2>
                            <button className={styles.modalClose} onClick={closeModal} type="button">
                                <FaXmark />
                            </button>
                        </div>

                        <form className={styles.modalForm} onSubmit={handleSubmit}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>CIN</label>
                                    <input name="cin" value={form.cin} onChange={handleChange} />
                                    {errors.cin && <span className={styles.errorText}>{errors.cin}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Nom</label>
                                    <input name="nom" value={form.nom} onChange={handleChange} />
                                    {errors.nom && <span className={styles.errorText}>{errors.nom}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Prénom</label>
                                    <input name="prenom" value={form.prenom} onChange={handleChange} />
                                    {errors.prenom && <span className={styles.errorText}>{errors.prenom}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Email</label>
                                    <input name="mail" type="email" value={form.mail} onChange={handleChange} />
                                    {errors.mail && <span className={styles.errorText}>{errors.mail}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Téléphone</label>
                                    <input name="tel" value={form.tel} onChange={handleChange} />
                                    {errors.tel && <span className={styles.errorText}>{errors.tel}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Âge</label>
                                    <input name="age" type="number" value={form.age} onChange={handleChange} />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Spécialité</label>
                                    <select
                                        name="specialite"
                                        value={form.specialite}
                                        onChange={handleChange}
                                        className="h-[42px] w-64 rounded-xl border-slate-200 bg-slate-50 px-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none border"
                                    >
                                        <option value="">Tous</option>
                                        {specs.map((s) => (
                                            <option key={s.nomspec} value={s.nomspec}>
                                                {s.nomspec}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.specialite && (
                                        <span className={styles.errorText}>{errors.specialite}</span>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Date d'arrivée</label>
                                    <input
                                        name="dateArrivee"
                                        type="date"
                                        value={form.dateArrivee}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Mot de passe</label>
                                    <input
                                        name="password"
                                        type="text"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder={modalMode === "edit" ? "(laisser vide si inchangé)" : ""}
                                    />
                                    {errors.password && (
                                        <span className={styles.errorText}>{errors.password}</span>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={regenerer}
                                    className="mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md transition-all duration-200 hover:bg-emerald-600 hover:scale-110 hover:shadow-lg active:scale-95"
                                    title="Générer mot de passe"
                                >
                                    <FaRotateRight size={16} />
                                </button>

                                <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                                    <label>Description</label>
                                    <textarea
                                        className="px-3 py-2"
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows={3}
                                    />
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                                    Annuler
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    {modalMode === "add" ? "Ajouter" : "Enregistrer"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showFeedbackModal && (
                <div
                    onClick={closeFeedback}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
                    >
                        <div
                            className={`flex items-center justify-between px-6 py-4 border-b ${
                                feedback.type === "success"
                                    ? "bg-emerald-50 border-emerald-200"
                                    : "bg-red-50 border-red-200"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`h-10 w-10 flex items-center justify-center rounded-xl text-lg font-bold ${
                                        feedback.type === "success"
                                            ? "bg-emerald-100 text-emerald-600"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {feedback.type === "success" ? "✓" : "!"}
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">
                                        {feedback.type === "success" ? "Succès" : "Erreur"}
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        {feedback.type === "success"
                                            ? "Opération terminée avec succès"
                                            : "Une erreur est survenue"}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={closeFeedback}
                                type="button"
                                className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition"
                            >
                                <FaXmark />
                            </button>
                        </div>

                        <div className="px-6 py-6 text-center">
                            <p
                                className={`text-base font-semibold ${
                                    feedback.type === "success" ? "text-emerald-600" : "text-red-600"
                                }`}
                            >
                                {feedback.message}
                            </p>
                        </div>

                        <div className="px-6 pb-6 flex justify-center">
                            <button
                                onClick={closeFeedback}
                                className={`px-6 py-2 rounded-xl font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 ${
                                    feedback.type === "success"
                                        ? "bg-emerald-500 hover:bg-emerald-600"
                                        : "bg-red-500 hover:bg-red-600"
                                }`}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Infirmieres;