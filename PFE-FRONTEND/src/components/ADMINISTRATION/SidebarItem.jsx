import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const SidebarItem = ({ name, Icon, path, isActive }) => {
    // On adapte le chemin pour l'administration
    const fullPath = `/administration/${path}`;

    return (
        <li className={styles.sidebarItemContainer}>
            <Link
                to={fullPath}
                className={`${styles.itemContent} ${isActive ? styles.active : ''}`}
            >
                <Icon className={styles.menuIcon} size={20} />
                <span className={styles.itemName}>{name}</span>
            </Link>
        </li>
    );
};

export default SidebarItem;