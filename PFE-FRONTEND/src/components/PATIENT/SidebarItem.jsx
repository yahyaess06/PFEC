// src/components/PATIENT/SidebarItem.jsx (Finalisé)

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const SidebarItem = ({ name, Icon, path, isActive }) => {
    
    const fullPath = `/patient/${path}`;
    
    return (
        // Le <li> est le conteneur de la liste. S'il avait une marge, il la garde.
        <li className={styles.sidebarItemContainer}> 
            
            <Link 
                to={fullPath} 
                // C'est ici que le style du "bouton" et l'état actif DOIVENT être appliqués.
                className={`${styles.itemContent} ${isActive ? styles.active : ''}`}

            >
                <Icon className={styles.menuIcon} size={20} />
                <span className={styles.itemName}>{name}</span>
            </Link>
            
        </li>
    );
};

export default SidebarItem;