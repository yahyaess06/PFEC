import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VerifyCode.module.css';
import { ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';

const VerifyCode = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(59);
    const inputs = useRef([]);
    const navigate = useNavigate();

    // Gestion du compte à rebours
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        const newCode = [...code];
        newCode[index] = element.value;
        setCode(newCode);

        // Focus automatique sur l'input suivant
        if (element.value !== '' && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && code[index] === '') {
            inputs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullCode = code.join('');

        // On vérifie que le code est complet (6 chiffres)
        if (fullCode.length === 6) {
            console.log("Code vérifié :", fullCode);

            // REDIRECTION vers la page de réinitialisation
            navigate('/reset-password');
        } else {
            alert("Veuillez entrer le code complet.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconHeader}>
                    <ShieldCheck size={40} color="#2563eb" fill="#eff6ff" />
                </div>

                <h1 className={styles.title}>Vérification du code</h1>
                <p className={styles.subtitle}>
                    Saisissez le code à 6 chiffres envoyé à votre adresse e-mail.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.codeContainer}>
                        {code.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                ref={(el) => (inputs.current[index] = el)}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className={styles.codeInput}
                            />
                        ))}
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Vérifier
                        <CheckCircle2 size={18} />
                    </button>
                </form>

                <div className={styles.resendText}>
                    Vous n'avez pas reçu le code ? {' '}
                    <button
                        className={styles.resendBtn}
                        disabled={timer > 0}
                        onClick={() => setTimer(59)} // Optionnel: relance le timer au clic
                    >
                        Renvoyer le code {timer > 0 && `(${timer}s)`}
                    </button>
                </div>

                <button className={styles.backBtn} onClick={() => navigate('/login')}>
                    <ArrowLeft size={18} />
                    Retour à la connexion
                </button>
            </div>

            <div className={styles.securityFooter}>
                <ShieldCheck size={14} />
                CONNEXION SÉCURISÉE
            </div>
        </div>
    );
};

export default VerifyCode;