import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook de navigation
import styles from './ForgotPassword.module.css';
import { Mail, ArrowLeft, Send, PlusSquare } from 'lucide-react';
import {envoyerMail} from "../../services/ResetService.js";
import {FiX} from "react-icons/fi";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); // Initialisation de la navigation

    const [mhlol, setmhlol] = useState(false);
    const toggleMenu = () => setmhlol(!mhlol)
    //forumlaire m7lol olala??
    const [contactm7lol, setcontactm7lol] = useState(false);
    const contactformm7lol = () => setcontactm7lol(true)
    const contactformmsdod = () => setcontactm7lol(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
        toggleMenu(); contactformm7lol()
        const res=await envoyerMail(email);
console.log(res.data);
    }catch (err){
        console.error(err)
    }
        // Redirection vers la page de vérification du code
        // navigate('/verify-code');
    };

    return (
        <div className={styles.container}>
            {/* Arrière-plan décoratif avec icônes médicales */}
            <div className={styles.backgroundIcons}></div>

            <div className={styles.card}>
                <div className={styles.iconHeader}>
                    <PlusSquare size={32} color="#2563eb" />
                </div>

                <h1 className={styles.title}>Mot de passe oublié ?</h1>
                <p className={styles.subtitle}>
                    Entrez votre adresse e-mail pour recevoir un lien de réinitialisation sécurisé.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Adresse e-mail</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.inputIcon} size={20} />
                            <input
                                type="email"
                                id="email"
                                placeholder="nom@clinique.fr"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Envoyer le code
                        <Send size={18} />
                    </button>
                </form>

                <button className={styles.backBtn} onClick={() => navigate('/login')}>
                    <ArrowLeft size={18} />
                    Retour à la connexion
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
                    <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 animate-[fadeIn_.3s_ease-out]">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                            <h2 className="text-lg font-semibold text-slate-800">
                                ✔ Email envoyé avec succès
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
                        <div className="px-6 py-6 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                                <span className="text-2xl text-green-600">✓</span>
                            </div>

                            <p className="text-sm text-slate-600">
                                Un lien de réinitialisation a été envoyé à votre adresse email.
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                                Veuillez vérifier votre boîte de réception.
                            </p>

                            <button
                                onClick={contactformmsdod}
                                className="mt-6 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <footer className={styles.footer}>
                Système de gestion hospitalière sécurisé © 2024
            </footer>
        </div>

    );
};

export default ForgotPassword;