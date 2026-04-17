import React from 'react';
import {NavLink, Route} from 'react-router-dom';
import styles from './Sidebar.module.css';
import {
    LayoutDashboard,
    Hospital,
    UserRound,
    CalendarCheck,
    PieChart,
    UserCog,
    Activity, History,Users
} from 'lucide-react';
import Historique from "../DOCTOR/Historique.jsx";

const Sidebar = () => {
    const menuItems = [
        { icon: <LayoutDashboard size={18} />, label: 'Tableau de bord', path: '/ADMINISTRATION/dashboard' },
        { icon: <Hospital size={18} />, label: 'Départements', path: '/ADMINISTRATION/departements' },
        { icon: <UserRound size={18} />, label: 'Docteurs', path: '/ADMINISTRATION/doctors' },
        { icon: <UserRound size={18} />, label: 'Infirmières', path: '/ADMINISTRATION/infirmieres' },
        { icon: <Users size={20} />, label: 'Admins', path: '/ADMINISTRATION/administateurs' },
        { icon: <CalendarCheck size={18} />, label: 'Rendez-vous', path: '/ADMINISTRATION/rendez-vous' },
        { icon: <History size={20} />, label: 'Historique patients', path: '/ADMINISTRATION/historique' },
    ];

    return (
        <div className={styles.sidebar}>
            <div className={styles.logoSection}>
                <div className={styles.logoCircle}>
                    <Activity color="white" size={20} />
                </div>
                <h3>Établissement Public</h3>
                <span>Administration</span>
            </div>

            <nav className={styles.nav}>
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `${styles.navItem} ${isActive ? styles.active : ''}`
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* ✅ Profil Admin cliquable */}
            <NavLink
                to="/ADMINISTRATION/profile"
                className={({ isActive }) =>
                    `${styles.doctorProfile} ${isActive ? styles.activeProfile : ''}`
                }
            >
                <div className={styles.avatar}>
                    <UserCog size={18} />
                </div>
                <div>
                    <p className={styles.docName}>Administrateur</p>
                    <p className={styles.docStatus}>Connecté</p>
                </div>
            </NavLink>
        </div>
    );
};

export default Sidebar;