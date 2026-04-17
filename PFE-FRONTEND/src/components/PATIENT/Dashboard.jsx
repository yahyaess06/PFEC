import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { getPatientDashboard, voireNotification } from '../../services/dashboardPatientService';

import {
    FaChartLine,
    FaCalendarAlt,
    FaClock,
    FaCheckCircle,
    FaUserMd,
    FaCalendarPlus,
    FaBell
} from 'react-icons/fa';

import { isVerified, valideagain } from "../../services/VerificationService.js";

const primaryGreen = '#2ecc71';
const accentBlue = '#3498db';

function safeDate(dateValue) {
    if (!dateValue) return null;
    const d = new Date(dateValue);
    return Number.isNaN(d.getTime()) ? null : d;
}

function formatDateFR(d) {
    return d.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

function formatTimeFR(d) {
    return d.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className={styles.statCard}>
        <div className={styles.statIcon} style={{ backgroundColor: color }}>
            <Icon size={24} color="white" />
        </div>
        <div className={styles.statContent}>
            <p className={styles.statTitle}>{title}</p>
            <h2 className={styles.statValue}>{value ?? 0}</h2>
        </div>
    </div>
);


const NextAppointment = ({ rdv, navigate }) => (
    <div className={styles.nextRdvCard}>
        <h3 className={styles.nextRdvTitle}>
            <FaCalendarAlt size={20} style={{ marginRight: '10px', color: primaryGreen }} />
            Votre Prochain Rendez-vous
        </h3>

        {rdv ? (
            <div className={styles.rdvDetails}>

                <div className={styles.rdvItem}>
                    <FaClock size={16} color={primaryGreen} style={{ marginRight: 10 }} />
                    {/*<span className={styles.rdvLabel}>Date & Heure:</span>*/}
                    <span className={styles.rdvLabel}>Date :</span>
                    <span className={styles.rdvText}>
            {/*{rdv.date} à {rdv.heure}*/}
            {rdv.date}
        </span>
                </div>

                <div className={styles.rdvItem}>
                    <FaUserMd size={16} color={primaryGreen} style={{ marginRight: 10 }} />
                    <span className={styles.rdvLabel}>{rdv.role}:</span>
                    <span className={styles.rdvText}>{rdv.personne}</span>
                </div>

                <div className={styles.rdvItem}>
                    <FaCheckCircle size={16} color={primaryGreen} style={{ marginRight: 10 }} />
                    <span className={styles.rdvLabel}>Spécialité:</span>
                    <span className={styles.rdvText}>{rdv.specialite}</span>
                </div>

                <div className={styles.rdvItem}>
                    <FaCalendarAlt size={16} color={primaryGreen} style={{ marginRight: 10 }} />
                    <span className={styles.rdvLabel}>Période:</span>
                    <span className={styles.rdvText}>
            {rdv.periode === "matin" ? "Matin" : "Après-midi"}
        </span>
                </div>

                <div className={styles.rdvItem}>
                    <FaCheckCircle size={16} color={primaryGreen} style={{ marginRight: 10 }} />
                    <span className={styles.rdvLabel}>Numéro:</span>
                    <span className={styles.rdvText}>#{rdv.numero}</span>
                </div>

            </div>
        ) : (
            <p className={styles.noRdv}>
                Aucun rendez-vous à venir.
            </p>
        )}

        <button
            className={styles.actionButton}
            onClick={() => navigate('/patient/mes-rdv')}
        >
            Voir Mes Rendez-vous
        </button>
    </div>
);

const Verification = () => {
    const [isVerifieD, setIsVerifieD] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [modal, setModal] = useState({
        open: false,
        message: "",
        type: "" // "success" | "error"
    });

    useEffect(() => {
        checkVerified();
    }, []);

    const checkVerified = async () => {
        try {
            const res = await isVerified();
            setIsVerifieD(res.data === true);
        } catch (e) {
            console.log(e);
            setIsVerifieD(false);
        }
    };

    const valideragain = async () => {
        setIsLoading(true);
        try {
            await valideagain();
            setModal({
                open: true,
                message: "Email de vérification renvoyé avec succès",
                type: "success"
            });
        } catch (e) {
            console.log(e);
            setModal({
                open: true,
                message: "Erreur lors du renvoi de l'email",
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isVerifieD ? (
                <div
                    className="flex items-center justify-between bg-green-100/60 border border-green-300/40 rounded-lg px-4 py-3 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-700">
            Compte vérifié
        </span>
                    </div>
                </div>
            ) : (
                <div
                    className="flex items-center gap-4 bg-yellow-50 border border-yellow-200 rounded-xl px-6 py-4 shadow-sm mb-4">
                    <h1 className="text-yellow-700 font-semibold text-lg flex items-center gap-2">
                        Compte non vérifié
                    </h1>

                    <button
                        onClick={valideragain}
                        className="ml-auto px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
                    >
                        Renvoyer email de vérification
                    </button>
                </div>
            )}

            {/* Loader */}
            {isLoading && (
                <div className="fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
                        <div className="h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-600 font-medium">Chargement...</p>
                    </div>
                </div>
            )}

            {/* Modal */}
            {modal.open && (
                <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center animate-fadeIn">

                        <h2
                            className={`text-lg font-semibold mb-3 ${
                                modal.type === "success"
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {modal.type === "success" ? "Succès" : "Erreur"}
                        </h2>

                        <p className="text-gray-600 mb-4">{modal.message}</p>

                        <button
                            onClick={() =>
                                setModal({ ...modal, open: false })
                            }
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
const Dashboard = () => {
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [not, setNot] = useState({});
    const [isNot, setIsNot] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const voirenot = async () => {
        try {
            const res = await voireNotification();
            setNot(res.data);
            setIsNot(res.data?.krib === true);
        } catch (er) {
            console.error(er);
            setIsNot(false);
            setNot({});
        }
    };

    useEffect(() => {
        voirenot();
    }, []);

    useEffect(() => {
        getPatientDashboard()
            .then(res => setDashboardData(res.data))
            .catch(err => {
                console.error(err);
                navigate("/login");
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    const prochainRdv = useMemo(() => {
        const pr = dashboardData?.prochainRdv;
        if (!pr) return null;

        const d = safeDate(pr.date);
        if (!d) return null;

        const nomPersonne = pr.nomMedecin || pr.nomInfermier || '—';
        const rolePersonne = pr.nomMedecin ? 'Docteur' : 'Infirmier';

        return {
            date: formatDateFR(d),
            heure: formatTimeFR(d),
            personne: nomPersonne,
            role: rolePersonne,
            specialite: pr.specialite || '—',
            periode: pr.periode,
            numero: pr.nbrRdv
        };
    }, [dashboardData]);

    if (loading) return <p>Chargement du tableau de bord...</p>;
    if (!dashboardData) return <p>Erreur lors du chargement</p>;

    return (
        <div className={styles.container}>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-96 text-center">
                        <h2 className="text-xl font-bold mb-4 text-green-600">
                            Actions
                        </h2>

                        <p className="text-gray-700 mb-6">
                            {not?.message || "Aucune notification"}
                        </p>

                        <button
                            onClick={() => setShowModal(false)}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}

            <Verification />

            <div className={styles.header}>
                <h1 className={styles.pageTitle}>
                    <FaChartLine size={30} style={{ marginRight: '10px', color: primaryGreen }} />
                    Tableau de Bord
                </h1>
                <p className={styles.subtitle}>Bienvenue dans votre espace patient</p>
            </div>

            <div className={styles.statsContainer}>
                <StatCard
                    icon={FaCalendarAlt}
                    title="RDV à Venir"
                    value={dashboardData.rdvAVenir}
                    color={primaryGreen}
                />

                <StatCard
                    icon={FaCheckCircle}
                    title="RDV Terminés"
                    value={dashboardData.rdvTermines}
                    color={accentBlue}
                />
            </div>

            <div className={styles.mainContentRow}>
                <div className={styles.nextRdvSection}>
                    <NextAppointment rdv={prochainRdv} navigate={navigate} />
                </div>

                <div className={styles.quickActionsSection}>
                    <h3 className={styles.quickActionsTitle}>Actions Rapides</h3>

                    <button
                        className={`${styles.quickActionButton} ${styles.quickActionGreen}`}
                        onClick={() => navigate('/patient/HospitalList')}
                    >
                        <FaCalendarPlus style={{ marginRight: 10 }} />
                        Prendre un Nouveau RDV
                    </button>

                    <button
                        className={`${styles.quickActionButton} ${styles.quickActionBlue}`}
                        onClick={() => navigate('/patient/doctors')}
                    >
                        <FaUserMd style={{ marginRight: 10 }} />
                        Consulter Nos Docteurs
                    </button>

                    {isNot ? (
                        <div className={`${styles.quickActionButton} ${styles.quickActionGray} relative`}>
                            <span className="absolute -top-2 -left-2 bg-red-600 w-5 h-5 rounded-full shadow-md animate-pulse z-10"></span>

                            <button
                                className="flex items-center px-12 py-2 font-semibold"
                                onClick={() => setShowModal(true)}
                            >
                                <FaBell className="mr-2" />
                                Information sur votre rendez vous
                            </button>
                        </div>
                    ) : (
                        <button className={`${styles.quickActionButton} ${styles.quickActionGray}`}>
                            <FaBell style={{ marginRight: 10 }} />
                            Ya pas de rendez vous a gerer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;