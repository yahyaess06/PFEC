import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import styles from './Sidebar.module.css';
import {
    LayoutDashboard,
    Calendar,
    ClipboardList,
    Stethoscope,
    History,
    User
} from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Tableau de bord', path: '/doctor/dashboard' },
        // { icon: <Calendar size={20} />, label: 'Mon planning', path: '/doctor/planning' },
        { icon: <ClipboardList size={20} />, label: 'Mes rendez-vous', path: '/doctor/rendez-vous' },
        // { icon: <Stethoscope size={20} />, label: 'Consultations', path: '/doctor/consultation' },
        { icon: <History size={20} />, label: 'Historique patients', path: '/doctor/historique' },
    ];

    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <div className={styles.sidebar}>

            {/* LOGO */}
            <div className={styles.logoSection}>
                <div className={styles.logoCircle}>
                    <Stethoscope color="white" />
                </div>
                <h3>Hopital Public</h3>
                <span>Espace Docteur</span>
            </div>

            {/* NAVIGATION */}
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

            {/* PROFILE */}
            <div
                className={styles.doctorProfile}
                onClick={() => console.log("Profil")}
                style={{ cursor: "pointer" }}
            >
                <div className={styles.avatar}>
                    <User size={20} />
                </div>
                <div>
                    <button  onClick={()=>handleNavigation("/doctor/profildoctor")}>
                    <p className={styles.docName}>Docteur</p>
                    <p className={styles.docStatus}>Connecté</p>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Sidebar;
