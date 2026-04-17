import React from 'react';
import styles from './Sidebar.module.css';

const SidebarItem = ({ icon, label, isActive, onClick }) => {
    return (
        <button
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            <span className={styles.navIcon}>{icon}</span>
            <span className={styles.navLabel}>{label}</span>
        </button>
    );
};

export default SidebarItem;