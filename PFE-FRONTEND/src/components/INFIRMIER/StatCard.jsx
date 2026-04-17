import React from 'react';
import styles from './Dashboard.module.css';
import { Users, Syringe, ClipboardList } from 'lucide-react';

const StatCard = ({ title, value, trend, icon, color }) => {
    // Mapping des icônes pour les rendre dynamiques
    const icons = {
        users: <Users size={24} />,
        syringe: <Syringe size={24} />,
        list: <ClipboardList size={24} />
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                {/* On applique une classe dynamique pour la couleur du fond de l'icône */}
                <div className={`${styles.iconBg} ${styles[color]}`}>
                    {icons[icon]}
                </div>
                <span className={`${styles.trendBadge} ${trend.startsWith('+') ? styles.trendUp : styles.trendDown}`}>
          {trend}
        </span>
            </div>
            <div className={styles.cardBody}>
                <h2 className={styles.statValue}>{value}</h2>
                <p className={styles.statLabel}>{title}</p>
            </div>
        </div>
    );
};

export default StatCard;