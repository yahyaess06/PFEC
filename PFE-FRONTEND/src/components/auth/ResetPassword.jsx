import React, { useState } from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import styles from './ResetPassword.module.css';
import { Lock, Eye, EyeOff, Check, Circle, ArrowRight, RotateCcw } from 'lucide-react';
import {resetPass} from "../../services/ResetService.js";
import {FiX} from "react-icons/fi";

const ResetPassword = () => {
    const [passwords, setPasswords] = useState({ new: '', confirm: '' });
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    // Critères de validation
    const validations = {
        length: passwords.new.length >= 8,
        uppercase: /[A-Z]/.test(passwords.new),
        numberOrSpecial: /[0-9!@#$%^&*]/.test(passwords.new)
    };



    const getStrength = () => {
        const score = Object.values(validations).filter(Boolean).length;
        if (score === 0) return { label: 'FAIBLE', color: '#ef4444', percent: '0%' };
        if (score === 1) return { label: 'FAIBLE', color: '#ef4444', percent: '33%' };
        if (score === 2) return { label: 'MOYEN', color: '#f59e0b', percent: '66%' };
        return { label: 'FORT', color: '#10b981', percent: '100%' };
    };
    const [mhlol, setmhlol] = useState(false);
    const toggleMenu = () => setmhlol(!mhlol)
    //forumlaire m7lol olala??
    const [contactm7lol, setcontactm7lol] = useState(false);
    const contactformm7lol = () => setcontactm7lol(true)
    const contactformmsdod = () => setcontactm7lol(false)

    const strength = getStrength();
    const [SearchParams]=useSearchParams();
    const tokenvalue=SearchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(validations).every(Boolean) && passwords.new === passwords.confirm) {
            console.log(passwords.new,passwords.confirm)
const form ={
    token:tokenvalue,
    password:passwords.new,
    confirmPassword:passwords.confirm
}
try {
    toggleMenu(); contactformm7lol()
    await resetPass(form);
}catch (err){
                console.error(err);
}

            // navigate('/login');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconHeader}>
                    <RotateCcw size={30} color="#2563eb" />
                </div>

                <h1 className={styles.title}>Réinitialiser le mot de passe</h1>
                <p className={styles.subtitle}>
                    Veuillez choisir un nouveau mot de passe sécurisé pour votre compte infirmier.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Nouveau mot de passe */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Nouveau mot de passe</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.inputIcon} size={18} />
                            <input
                                type={showPass ? "text" : "password"}
                                value={passwords.new}
                                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                placeholder="••••••••••••"
                                className={styles.input}
                            />
                            <button
                                type="button"
                                className={styles.toggleBtn}
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Barre de force */}
                    <div className={styles.strengthContainer}>
                        <div className={styles.strengthHeader}>
                            <span>FORCE DU MOT DE PASSE</span>
                            <span style={{ color: strength.color }}>{strength.label}</span>
                        </div>
                        <div className={styles.progressBarBg}>
                            <div
                                className={styles.progressBarFill}
                                style={{ width: strength.percent, backgroundColor: strength.color }}
                            />
                        </div>
                    </div>

                    {/* Confirmer le mot de passe */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Confirmer le mot de passe</label>
                        <div className={styles.inputWrapper}>
                            <Check className={styles.inputIcon} size={18} />
                            <input
                                type="password"
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                placeholder="••••••••••••"
                                className={styles.input}
                            />
                        </div>
                    </div>

                    {/* Checklist des critères */}
                    <div className={styles.checklist}>
                        <div className={validations.length ? styles.checkItemActive : styles.checkItem}>
                            {validations.length ? <Check size={14} /> : <Circle size={14} />}
                            Au moins 8 caractères
                        </div>
                        <div className={validations.uppercase ? styles.checkItemActive : styles.checkItem}>
                            {validations.uppercase ? <Check size={14} /> : <Circle size={14} />}
                            Une lettre majuscule
                        </div>
                        <div className={validations.numberOrSpecial ? styles.checkItemActive : styles.checkItem}>
                            {validations.numberOrSpecial ? <Check size={14} /> : <Circle size={14} />}
                            Un chiffre ou caractère spécial
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Enregistrer le nouveau mot de passe
                        <ArrowRight size={18} />
                    </button>
                </form>

                <button className={styles.backBtn} onClick={() => navigate('/login')}>
                    ← Retour à la connexion
                </button>
            </div>
            {contactm7lol && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={contactformmsdod}
                    />

                    {/* Modal */}
                    <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 animate-[fadeIn_.25s_ease-out]">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Mot de passe modifié
                            </h2>

                            <button
                                onClick={contactformmsdod}
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                                aria-label="Fermer"
                            >
                                <FiX className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-8 text-center">

                            {/* Success Icon */}
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <span className="text-3xl text-green-600">✓</span>
                            </div>

                            <p className="text-sm text-slate-600">
                                Votre mot de passe a été renouvelé avec succès.
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                                Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
                            </p>

                            {/* Buttons */}
                            <div className="mt-8 flex flex-col gap-3">

                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    Aller à la connexion
                                </button>

                                <button
                                    onClick={contactformmsdod}
                                    className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                                >
                                    Fermer
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ResetPassword;