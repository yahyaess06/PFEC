import React, { useEffect, useState } from "react";
import styles from "./Profil.module.css";
import {
    User,
    Mail,
    IdCard,
    LogOut,
    Camera,
    Phone,
    MapPin,
    Calendar,
    BadgeCheck
} from "lucide-react";
import axios from "../../services/api";

const Profil = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await axios.get("/infermier/profile");
            setUser(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    if (loading) {
        return <div className={styles.center}>Chargement...</div>;
    }

    if (!user) {
        return <div className={styles.center}>Erreur chargement profil</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>

                {/* HEADER */}
                <div className={styles.header}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatarLarge}>
                            {user.prenom?.charAt(0)}
                            {user.nom?.charAt(0)}
                        </div>

                        {/*<button className={styles.editAvatar}>*/}
                        {/*    <Camera size={16} />*/}
                        {/*</button>*/}
                    </div>

                    <h1 className={styles.name}>
                        {user.prenom} {user.nom}
                    </h1>

                    <span className={styles.badge}>
                        Infirmier
                    </span>
                </div>

                {/* INFOS */}
                <div className={styles.details}>

                    <InfoRow
                        icon={<IdCard size={20} />}
                        label="CIN"
                        value={user.cin}
                    />

                    <InfoRow
                        icon={<Calendar size={20} />}
                        label="Âge"
                        value={user.age}
                    />

                    <InfoRow
                        icon={<Phone size={20} />}
                        label="Téléphone"
                        value={user.telephone}
                    />

                    <InfoRow
                        icon={<Mail size={20} />}
                        label="Email"
                        value={user.email}
                    />
                    {/*hta nchof chno derti f admin 3ad nzid howa o sexe*/}
                    {/*<InfoRow*/}
                    {/*    icon={<MapPin size={20} />}*/}
                    {/*    label="Adresse"*/}
                    {/*    value={user.adresse}*/}
                    {/*/>*/}

                    <InfoRow
                        icon={<BadgeCheck size={20} />}
                        label="Spécialité"
                        value={user.specialite}
                    />

                </div>

                {/* LOGOUT */}
                <button className={styles.logoutBtn} onClick={handleLogout}>
                    <LogOut size={18} />
                    Déconnexion
                </button>

            </div>
        </div>
    );
};

const InfoRow = ({ icon, label, value }) => (
    <div className={styles.infoRow}>
        <div className={styles.iconBox}>{icon}</div>
        <div className={styles.infoText}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value || "—"}</span>
        </div>
    </div>
);

export default Profil;