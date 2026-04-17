import React, { useEffect, useState } from "react";
import styles from "./Admins.module.css";
import {
    FaPlus,
    FaPen,
    FaTrash,
    FaEnvelope,
    FaPhone,
    FaXmark,
    FaRotateRight,
} from "react-icons/fa6";

import {
    getCountAdmins,
    voireAdmins,
    supprimerAdmin,
    creerOuModifierAdmin,
    voirAdmin,
} from "../../services/AdminService";
import {getUserRole} from "../../services/authService.js";

const Admins = () => {
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
        datearrive: "",
        password: "",
    };

    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    const [count, setCount] = useState({ countInf: 0 });
    const [rows, setRows] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [tPage, setTPage] = useState(0);

    // filtre
    const [cin, setCin] = useState("");
    const [nom, setNom] = useState("");
    const [isnom, setIsNom] = useState(false);

    // ✅ Feedback modal
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedback, setFeedback] = useState({ type: "success", message: "" });

    const openFeedback = (type, message) => {
        setFeedback({ type, message });
        setShowFeedbackModal(true);
    };

    const [isDirector,setIsDirector]=useState(false)
    const direct=()=>{
        const role = getUserRole();
        console.log(role)
        if(role==="DIRECTOR"){
            setIsDirector(true)
        }
    }
    const closeFeedback = () => setShowFeedbackModal(false);
    const loadCount = async () => {
        try {
            const res = await getCountAdmins();
            setCount(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchRows = async () => {
        try {
            const res = await voireAdmins(currentPage, nom, cin, 5);
            const data = res?.data;

            setRows(data?.ads ?? []);
            setCurrentPage(data?.currentPage ?? currentPage);
            setTPage(data?.totalPages ?? 0);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadCount();
        direct();
    }, []);

    useEffect(() => {
        fetchRows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, cin, nom, isnom]);

    // -------- PAGINATION ----------
    const setSuivant = () => {
        if (currentPage < tPage - 1) setCurrentPage((p) => p + 1);
    };

    const setPrecedant = () => {
        if (currentPage > 0) setCurrentPage((p) => p - 1);
    };

    // -------- MODAL ----------
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
        if (!form.cin.trim()) newErrors.cin = "CIN obligatoire";
        if (!form.nom.trim()) newErrors.nom = "Nom obligatoire";
        if (!form.prenom.trim()) newErrors.prenom = "Prénom obligatoire";

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.mail);
        if (!emailOk) newErrors.mail = "Email invalide";

        if (!form.tel.trim()) newErrors.tel = "Téléphone obligatoire";

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

            const res = await voirAdmin(id);
            const a = res.data;

            // const rawDate = a?.datearrive;
            //
            // const dateISO = rawDate
            //     ? new Date(rawDate).toISOString().split("T")[0]
            //     : "";
            const dateISO = a?.datearrive
                ? String(a.datearrive).slice(0, 10)
                : "";

            setForm({
                id: a?.id ?? id,
                cin: a?.cin ?? "",
                nom: a?.nom ?? "",
                prenom: a?.prenom ?? "",
                mail: a?.mail ?? a?.email ?? "",
                tel: a?.tel ?? a?.telephone ?? "",
                age: a?.age ?? "",
                datearrive: dateISO,
                password: "",
            });
        } catch (err) {
            console.error(err);
            openFeedback("error", "Une erreur est survenue lors du chargement");
        }
    };

    const deleteAdmin = async (id) => {
        try {
            await supprimerAdmin(id);
            fetchRows();
            loadCount();
            openFeedback("success", "Admin supprimé avec succès");
        } catch (err) {
            console.error(err);
            openFeedback("error", "Erreur lors de la suppression");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const payload = { ...form };
            if (modalMode === "add") payload.id = null;

            if (
                modalMode === "edit" &&
                (!payload.password || payload.password.trim() === "")
            ) {
                delete payload.password;
            }

            await creerOuModifierAdmin(payload);

            closeModal();
            fetchRows();
            loadCount();

            openFeedback("success", "Admin traité avec succès");
        } catch (err) {
            console.error(err);
            openFeedback("error", "Une erreur est survenue");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Gestion des Admins</h1>
                    <p className={styles.subtitle}>Liste complète des administrateurs</p>
                </div>
                {isDirector &&
                <button className={styles.addBtn} onClick={openAddModal} type="button">
                    <FaPlus/> Ajouter un Admin
                </button>}
            </div>

            {/* COUNT CARD */}
            <div className="mb-6">
                <div className="relative overflow-hidden rounded-3xl
                  bg-gradient-to-r from-orange-500 to-red-500
                  p-6 text-white shadow-lg">

                    {/* Decorative soft shapes */}
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10"></div>
                    <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5"></div>

                    <div className="relative">
                        <p className="text-sm opacity-80">
                            Ensemble des admins
                        </p>

                        <h3 className="mt-2 text-4xl font-bold tracking-tight">
                            {count?.countInf ?? 0}
                        </h3>
                    </div>

                </div>
            </div>

            <div className={styles.tableCard}>
                {/* FILTER */}
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
                        className="h-[42px] px-6 bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                        type="button"
                    >
                        {isnom ? "Choisir par CIN" : "Choisir par nom"}
                    </button>
                </div>

                {/* TABLE */}
                <table className={styles.doctorTable}>
                    <thead>
                    <tr>
                        <th>Admin</th>
                        <th>Contact</th>
                        <th>CIN</th>
                        {isDirector &&
                        <th>Actions</th>
                        }
                    </tr>
                    </thead>

                    <tbody>
                    {rows.map((a, idx) => (
                        <tr key={`${a.id ?? "id"}-${idx}`}>
                            <td>
                                <div className={styles.userInfo}>
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            `${a.prenom ?? ""} ${a.nom ?? ""}`
                                        )}&background=f97316&color=fff`}
                                        alt={`${a.nom} ${a.prenom}`}
                                        className={styles.avatar}
                                    />
                                    <div className={styles.userMeta}>
                                        <strong>
                                            {a.nom} {a.prenom}
                                        </strong>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div className={styles.contactInfo}>
                                    <p>
                                        <FaEnvelope size={12}/> {a.mail ?? a.email}
                                    </p>
                                    <p>
                                        <FaPhone size={12}/> {a.tel ?? a.telephone}
                                    </p>
                                </div>
                            </td>

                            <td>
                  <span
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-inset ring-gray-200">
                    {a.cin}
                  </span>
                            </td>
                            {isDirector &&
                            <td>
                                <div className={styles.actions}>
                                    <button
                                        onClick={() => openEditModal(a.id)}
                                        className={styles.editBtn}
                                        type="button"
                                    >
                                        <FaPen size={12}/>
                                    </button>

                                    <button
                                        onClick={() => deleteAdmin(a.id)}
                                        className={styles.deleteBtn}
                                        type="button"
                                    >
                                        <FaTrash size={12}/>
                                    </button>
                                </div>
                            </td>}
                        </tr>
                    ))}

                    {rows.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{textAlign: "center", padding: "16px"}}>
                                Aucun admin trouvé.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
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

            {/* MODAL (add/edit) */}
            {showAddModal && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div
                        className={styles.modalCard}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalHeader}>
                            <h2>
                                {modalMode === "add" ? "Ajouter un Admin" : "Modifier un Admin"}
                            </h2>
                            <button
                                className={styles.modalClose}
                                onClick={closeModal}
                                type="button"
                            >
                                <FaXmark/>
                            </button>
                        </div>

                        <form className={styles.modalForm} onSubmit={handleSubmit}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>CIN</label>
                                    <input name="cin" value={form.cin} onChange={handleChange}/>
                                    {errors.cin && (
                                        <span className={styles.errorText}>{errors.cin}</span>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Nom</label>
                                    <input name="nom" value={form.nom} onChange={handleChange}/>
                                    {errors.nom && (
                                        <span className={styles.errorText}>{errors.nom}</span>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Prénom</label>
                                    <input
                                        name="prenom"
                                        value={form.prenom}
                                        onChange={handleChange}
                                    />
                                    {errors.prenom && (
                                        <span className={styles.errorText}>{errors.prenom}</span>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Email</label>
                                    <input
                                        name="mail"
                                        type="email"
                                        value={form.mail}
                                        onChange={handleChange}
                                    />
                                    {errors.mail && (
                                        <span className={styles.errorText}>{errors.mail}</span>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Téléphone</label>
                                    <input name="tel" value={form.tel} onChange={handleChange}/>
                                    {errors.tel && (
                                        <span className={styles.errorText}>{errors.tel}</span>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Âge</label>
                                    <input
                                        name="age"
                                        type="number"
                                        value={form.age}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Date d'arrivée</label>
                                    <input
                                        name="datearrive"
                                        type="date"
                                        value={form.datearrive}
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
                                    <FaRotateRight size={16}/>
                                </button>
                            </div>

                            <div className={styles.modalActions}>
                                <button
                                    type="button"
                                    className={styles.cancelBtn}
                                    onClick={closeModal}
                                >
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

            {/* ✅ FEEDBACK MODAL */}
            {showFeedbackModal && (
                <div
                    onClick={closeFeedback}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden animate-scaleIn"
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
                                <FaXmark/>
                            </button>
                        </div>

                        <div className="px-6 py-6 text-center">
                            <p
                                className={`text-base font-semibold ${
                                    feedback.type === "success"
                                        ? "text-emerald-600"
                                        : "text-red-600"
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

export default Admins;