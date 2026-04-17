import React from "react";
import styles from "./Sidebar.module.css";
import SidebarItem from "./SidebarItem";

import {
    FaUserDoctor,
    FaChartLine,
    FaUserGroup,
    FaCalendarCheck,
    FaListCheck,
    FaClockRotateLeft,
    FaCircleUser, // Nouvelle icône pour le profil
} from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

const navItems = [
    { name: "Tableau de bord", icon: FaChartLine, path: "dashboard" },
    { name: "Nos docteurs", icon: FaUserGroup, path: "doctors" },
    { name: "Prendre RDV", icon: FaCalendarCheck, path: "HospitalList" },
    { name: "Mes rendez-vous", icon: FaListCheck, path: "mes-rdv" },
    { name: "Historique médical", icon: FaClockRotateLeft, path: "historique" },
];

const Sidebar = ({ activePath }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const currentActivePath = activePath || "dashboard";

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.greenDivider}></div>

            <nav className={styles.sidebarMenu}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.headerIcon}>
                        <FaUserDoctor size={24} />
                    </div>
                    <h3>Établissement Public</h3>
                    <span className={styles.patientSpace}>Espace Patient</span>
                </div>

                <ul className={styles.menuList}>
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.path}
                            name={item.name}
                            Icon={item.icon}
                            path={item.path}
                            isActive={item.path === currentActivePath}
                        />
                    ))}
                </ul>

                {/* --- Footer Patient avec Icône --- */}
                <div className="mt-auto border-t border-gray-200/70 bg-white px-4 py-4">
                    <button
                        onClick={() => handleNavigation("/patient/ProfilPatient")}
                        className="flex items-center gap-3 w-full text-left group transition-all"
                    >
                        {/* Avatar / Icône Profil */}
                        <div className="text-gray-400 group-hover:text-green-500 transition-colors">
                            <FaCircleUser size={32} />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-green-500 transition">
                                Patient
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                                <span className="text-xs text-gray-500">Connecté</span>
                            </div>
                        </div>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;