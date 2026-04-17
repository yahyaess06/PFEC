import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { LayoutDashboard, Users, Syringe, Calendar, UserCircle } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { label: 'Tableau de bord', icon: <LayoutDashboard size={20} />, path: '/infirmier/dashboard' },
        { label: 'Mes rendez-vous', icon: <Users size={20} />, path: '/infirmier/rendez-vous' },
        { label: 'Historique patients', icon: <Syringe size={20} />, path: '/infirmier/HistoriqueInfermier' },
        //{ label: 'Mon planning', icon: <Calendar size={20} />, path: '/infirmier/planning' },
    ];

    return (
        <aside className={styles.sidebar}>
            {/* Header avec Logo Premium */}
            <div className={styles.header}>
                <div className={styles.logoCircle}>
                    <span className={styles.plusIcon}>+</span>
                </div>
                <h2 className={styles.brandName}>Établissement Public</h2>
                <p className={styles.subtitle}>ESPACE INFIRMIER</p>
            </div>

            {/* Navigation */}
            <nav className={styles.navList}>
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Utilisateur cliquable vers le Profil */}
            <div className={styles.footer}>
                <Link to="/infirmier/profil" className={styles.userProfileLink}>
                    <div className={styles.userProfile}>
                        <div className={styles.avatarContainer}>
                            <UserCircle size={40} strokeWidth={1.5} color="#cbd5e1" />
                            <span className={styles.statusDot}></span>
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>Mon Profil</span>
                            <span className={styles.statusText}>Connecté</span>
                        </div>
                    </div>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;